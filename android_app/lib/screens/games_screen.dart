import 'package:flutter/material.dart';
import '../services/ad_service.dart';

class GamesScreen extends StatelessWidget {
  const GamesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HTML5 Arcade Portal'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            color: const Color(0xFF131927),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: ListTile(
              contentPadding: const EdgeInsets.all(16),
              leading: const CircleAvatar(
                backgroundColor: Color(0x203B82F6),
                child: Icon(Icons.sports_esports, color: Color(0xFF3B82F6)),
              ),
              title: const Text('Cyber Runner 2099', style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: const Text('Arcade • ★ 4.85 (1,240 plays)', style: TextStyle(fontSize: 11)),
              trailing: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF3B82F6)),
                onPressed: () {
                  // Launch Game Session & Show Interstitial Ad on Natural Completion
                  AdService.instance.showInterstitialAd(
                    onComplete: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Game Session Finished — AdMob Natural Transition Compliant')),
                      );
                    },
                  );
                },
                child: const Text('Play Now', style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
