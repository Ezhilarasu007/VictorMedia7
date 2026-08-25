import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AiToolsScreen extends StatefulWidget {
  const AiToolsScreen({super.key});

  @override
  State<AiToolsScreen> createState() => _AiToolsScreenState();
}

class _AiToolsScreenState extends State<AiToolsScreen> {
  final TextEditingController _controller = TextEditingController();
  String _response = '';
  bool _loading = false;

  Future<void> _generateAiResponse() async {
    if (_controller.text.trim().isEmpty) return;
    setState(() {
      _loading = true;
      _response = '';
    });

    try {
      final res = await http.post(
        Uri.parse('https://victormedia.net/api/ai/text-assistant'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'prompt': _controller.text}),
      );
      final data = jsonDecode(res.body);
      setState(() {
        _response = data['output'] ?? 'No output returned.';
      });
    } catch (e) {
      setState(() {
        _response = 'Error connecting to VictorMedia AI server API.';
      });
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VictorMedia AI Assistant'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TextField(
            controller: _controller,
            maxLines: 4,
            decoration: InputDecoration(
              hintText: 'Enter technical query or code snippet...',
              filled: true,
              fillColor: const Color(0xFF131927),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF8B5CF6),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: _loading ? null : _generateAiResponse,
            icon: _loading ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : const Icon(Icons.auto_awesome),
            label: const Text('Generate AI Response'),
          ),
          if (_response.isNotEmpty) ...[
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.black45,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.purple.withOpacity(0.3)),
              ),
              child: SelectableText(_response, style: const TextStyle(fontSize: 12, fontFamily: 'monospace')),
            ),
          ]
        ],
      ),
    );
  }
}
