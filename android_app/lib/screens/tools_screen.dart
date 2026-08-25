import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ToolsScreen extends StatefulWidget {
  const ToolsScreen({super.key});

  @override
  State<ToolsScreen> createState() => _ToolsScreenState();
}

class _ToolsScreenState extends State<ToolsScreen> {
  String _input = '';
  String _output = '';

  void _calculateWordCount(String text) {
    final words = text.trim().isEmpty ? 0 : text.trim().split(RegExp(r'\s+')).length;
    final chars = text.length;
    setState(() {
      _output = 'Words: $words | Characters: $chars';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Developer & Text Tools'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            color: const Color(0xFF131927),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAlignment.start,
                children: [
                  const Text('Word & Character Counter', style: TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  TextField(
                    maxLines: 4,
                    onChanged: (val) {
                      _input = val;
                      _calculateWordCount(val);
                    },
                    decoration: InputDecoration(
                      hintText: 'Type or paste text here...',
                      filled: true,
                      fillColor: Colors.black26,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.black45,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(_output.isEmpty ? 'Result will appear here...' : _output, style: const TextStyle(fontSize: 12, color: Colors.blueAccent)),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
