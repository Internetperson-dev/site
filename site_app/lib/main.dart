import 'dart:html' as html;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:liquid_glass_widgets/liquid_glass_setup.dart';
import 'package:liquid_glass_widgets/liquid_glass_widgets.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await LiquidGlassWidgets.initialize();

  runApp(
    LiquidGlassWidgets.wrap(
      child: const SiteApp(),
      respectSystemAccessibility: true,
      adaptiveQuality: true,
    ),
  );
}

class SiteApp extends StatelessWidget {
  const SiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Internetperson-dev Useful Links',
      theme: const CupertinoThemeData(brightness: Brightness.dark),
      builder: (context, child) =>
          Theme(data: ThemeData.dark(useMaterial3: true), child: child!),
      home: const HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const _links = [
    ['Epic Games/Fortnite/Easy Anti Cheat on Linux thanks to AI', 'https://internetperson-dev.github.io/site/etc/2026-10-14-Epic%20Games%20Update.html'],
    ['Thoughts on the Metaverse/Fortnite/Ai/Unreal Engine 6/Epic Games', 'https://internetperson-dev.github.io/site/etc/2026-10-13-UnrealEngine6-UEFN-Thoughts.html'],
    ['3DS Games', 'https://wolfyxon.github.io/3ds-web-stuff/'],
    ['Lemmings', 'https://www.elizium.nu/scripts/lemmings/'],
    ['SNES Emu', 'https://kazuki-4ys.github.io/web_apps/snes9x-2005-wasm/'],
    ['Super Smash Flash', 'https://www.supersmashflash.com/play/ssf1/'],
    ['Super Smash Flash 2', 'https://kbhgames.com/game/super-smash-flash-2'],
  ];

  @override
  Widget build(BuildContext context) {
    return GlassScaffold(
      background: Container(
        decoration: const BoxDecoration(
          gradient: RadialGradient(
            center: Alignment(-0.8, -0.8),
            radius: 1.2,
            colors: [Color(0xFF1F1F1F), Color(0xFF121212)],
          ),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 600),
            child: ListView(
              padding: const EdgeInsets.all(40),
              children: [
                const Text(
                  'Useful Links',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700, color: Colors.white),
                ),
                const SizedBox(height: 24),
                GlassButton.custom(
                  useOwnLayer: true,
                  width: double.infinity,
                  height: 48,
                  onTap: () {},
                  child: const Text('/etc', style: TextStyle(color: Colors.white)),
                ),
                const SizedBox(height: 12),
                for (final link in _links) ...[
                  GlassButton.custom(
                    useOwnLayer: true,
                    width: double.infinity,
                    height: 44,
                    onTap: () => html.window.open(link[1], '_blank'),
                    child: Text(link[0], style: const TextStyle(color: Colors.white, fontSize: 14)),
                  ),
                  const SizedBox(height: 8),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}