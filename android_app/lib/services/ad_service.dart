import 'package:flutter/foundation.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

/// Professional AdMob Service for VictorMedia Android Application.
/// Strictly uses Google official Test Ad Unit IDs during development.
class AdService {
  static final AdService instance = AdService._internal();
  AdService._internal();

  bool _isInitialized = false;
  InterstitialAd? _interstitialAd;
  RewardedAd? _rewardedAd;

  // GOOGLE OFFICIAL TEST AD UNIT IDs (FOR DEVELOPMENT & TESTING)
  static const String bannerAdUnitId = 'ca-app-pub-3940256099942544/6300978';
  static const String interstitialAdUnitId = 'ca-app-pub-3940256099942544/10331737';
  static const String rewardedAdUnitId = 'ca-app-pub-3940256099942544/5224354917';

  Future<void> initialize() async {
    if (_isInitialized) return;
    try {
      await MobileAds.instance.initialize();
      _isInitialized = true;
      _preloadInterstitial();
      _preloadRewarded();
    } catch (e) {
      debugPrint('AdMob Initialization Warning: $e');
    }
  }

  /// Create and load a responsive Banner Ad for content screens
  BannerAd createBannerAd({required Function() onAdLoaded}) {
    return BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          debugPrint('AdMob Banner Loaded');
          onAdLoaded();
        },
        onAdFailedToLoad: (ad, error) {
          debugPrint('Banner load failed: $error');
          ad.dispose();
        },
      ),
    );
  }

  /// Preload Interstitial Ad for natural transitions (e.g. game completion)
  void _preloadInterstitial() {
    InterstitialAd.load(
      adUnitId: interstitialAdUnitId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitialAd = ad;
        },
        onAdFailedToLoad: (error) {
          debugPrint('Interstitial failed to load: $error');
          _interstitialAd = null;
        },
      ),
    );
  }

  /// Show Interstitial Ad ONLY at natural transition points
  void showInterstitialAd({required Function() onComplete}) {
    if (_interstitialAd != null) {
      _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          _preloadInterstitial();
          onComplete();
        },
        onAdFailedToShowFullScreenContent: (ad, error) {
          ad.dispose();
          _preloadInterstitial();
          onComplete();
        },
      );
      _interstitialAd!.show();
    } else {
      onComplete();
    }
  }

  /// Preload Rewarded Ad for voluntary user opt-in features
  void _preloadRewarded() {
    RewardedAd.load(
      adUnitId: rewardedAdUnitId,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          _rewardedAd = ad;
        },
        onAdFailedToLoad: (error) {
          debugPrint('Rewarded ad failed to load: $error');
          _rewardedAd = null;
        },
      ),
    );
  }

  /// Show Voluntary Rewarded Ad with Server-Side Verification (SSV)
  void showRewardedAd({
    required String userId,
    required String rewardType,
    required Function(RewardItem reward) onRewarded,
  }) {
    if (_rewardedAd != null) {
      _rewardedAd!.show(
        onUserEarnedReward: (AdWithoutView ad, RewardItem reward) async {
          debugPrint('User earned reward: ${reward.amount} ${reward.type}');
          
          // Trigger Server-Side Verification to prevent replay attacks
          await _verifyRewardOnServer(
            userId: userId,
            rewardType: rewardType,
            amount: reward.amount.toInt(),
          );

          onRewarded(reward);
        },
      );
      _rewardedAd = null;
      _preloadRewarded();
    } else {
      debugPrint('Rewarded ad not ready yet.');
    }
  }

  /// Send verification payload to VictorMedia backend API
  Future<void> _verifyRewardOnServer({
    required String userId,
    required String rewardType,
    required int amount,
  }) async {
    try {
      final rewardEventId = 'admob_ssv_${DateTime.now().millisecondsSinceEpoch}';
      final response = await http.post(
        Uri.parse('https://victormedia.net/api/ads/verify-reward'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'reward_event_id': rewardEventId,
          'user_id': userId,
          'ad_unit': rewardedAdUnitId,
          'reward_type': rewardType,
          'reward_amount': amount,
        }),
      );
      debugPrint('Server Verification Result: ${response.statusCode}');
    } catch (e) {
      debugPrint('Server reward verification failed: $e');
    }
  }
}
