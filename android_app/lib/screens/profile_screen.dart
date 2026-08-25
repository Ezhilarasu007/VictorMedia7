import 'package:flutter/material.dart';
import '../services/ad_service.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Account & Settings'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const ListTile(
            leading: CircleAvatar(child: Text('VM')),
            title: Text('VictorMedia Android User', style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text('user@victormedia.net', style: TextStyle(fontSize: 11)),
          ),
          const Divider(color: Colors.white10),
          ListTile(
            leading: const Icon(Icons.stars, color: Colors.amber),
            title: const Text('Earn Bonus Points (Watch Rewarded Ad)'),
            subtitle: const Text('Voluntary user opt-in rewarded ad', style: TextStyle(fontSize: 10)),
            onTap: () {
              AdService.instance.showRewardedAd(
                userId: 'user_android_123',
                rewardType: 'bonus_points',
                onRewarded: (reward) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Reward Earned: ${reward.amount} ${reward.type}')),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
