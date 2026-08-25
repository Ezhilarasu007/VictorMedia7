import 'package:flutter/material.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final categories = ['Programming', 'AI', 'Cybersecurity', 'Web Dev', 'Mobile Dev', 'Career'];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Explore Topics'),
        backgroundColor: const Color(0xFF131927),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Search articles & lessons...',
              prefixIcon: const Icon(Icons.search, color: Colors.grey),
              filled: true,
              fillColor: const Color(0xFF131927),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Text('Categories', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: categories.map((cat) {
              return Chip(
                label: Text(cat),
                backgroundColor: const Color(0xFF131927),
                side: BorderSide(color: Colors.blue.withOpacity(0.3)),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
