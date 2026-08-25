import 'package:flutter/material.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  int _score = 0;
  bool _answered = false;
  int? _selected;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Daily Quiz Challenge'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAlignment.start,
          children: [
            const Text(
              'Which HTTP header is specifically designed to mitigate Cross-Site Scripting (XSS)?',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ...List.generate(4, (index) {
              final options = [
                'Strict-Transport-Security',
                'Content-Security-Policy',
                'X-Frame-Options',
                'Access-Control-Allow-Origin'
              ];
              final isCorrect = index == 1;

              Color color = const Color(0xFF131927);
              if (_answered) {
                if (isCorrect) color = Colors.green.withOpacity(0.3);
                else if (index == _selected) color = Colors.red.withOpacity(0.3);
              }

              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  tileColor: color,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  title: Text(options[index], style: const TextStyle(fontSize: 13)),
                  onTap: () {
                    if (!_answered) {
                      setState(() {
                        _answered = true;
                        _selected = index;
                        if (isCorrect) _score += 10;
                      });
                    }
                  },
                ),
              );
            }),
            if (_answered) ...[
              const SizedBox(height: 16),
              const Container(
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.black45, borderRadius: BorderRadius.all(Radius.circular(8))),
                child: Text(
                  'Explanation: Content-Security-Policy (CSP) controls allowed script origins.',
                  style: TextStyle(fontSize: 11, color: Colors.amber),
                ),
              )
            ]
          ],
        ),
      ),
    );
  }
}
