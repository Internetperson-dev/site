import 'dart:js_interop';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:liquid_glass_widgets/liquid_glass_setup.dart';
import 'package:liquid_glass_widgets/liquid_glass_widgets.dart';

@JS('window.open')
external void _jsWindowOpen(String url, String target);

void _openUrl(String url) => _jsWindowOpen(url, '_blank');

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await LiquidGlassWidgets.initialize();
  runApp(
    LiquidGlassWidgets.wrap(
      child: const SiteApp(),
      adaptiveQuality: true,
    ),
  );
}

class SiteApp extends StatelessWidget {
  const SiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Useful Links',
      theme: const CupertinoThemeData(brightness: Brightness.dark),
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

  LiquidGlassSettings get _glass => LiquidGlassSettings(
        glassColor: const Color(0xCC1C1C1E),
        thickness: 30,
        blur: 2,
        chromaticAberration: .01,
        lightIntensity: 0.2,
        saturation: 1.2,
      );

  @override
  Widget build(BuildContext context) {
    return GlassScaffold(
      background: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF0F0F23), Color(0xFF1A1A2E), Color(0xFF16213E)],
          ),
        ),
        child: Stack(
          children: [
            Positioned(top: -100, right: -80, child: _blob(const Color(0xFF8FA2FF), 320)),
            Positioned(bottom: -60, left: -60, child: _blob(const Color(0xFFA855F7), 280)),
            Positioned(top: 200, left: 40, child: _blob(const Color(0xFF34C759), 180)),
          ],
        ),
      ),
      settings: _glass,
      statusBarStyle: GlassStatusBarStyle.light,
      appBar: GlassAppBar(
        title: const Text('Useful Links',
            style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w600)),
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              children: [
                for (final link in _links) ...[
                  GlassButton.custom(
                    onTap: () => _openUrl(link[1]),
                    quality: GlassQuality.premium,
                    useOwnLayer: true,
                    width: double.infinity,
                    height: 56,
                    shape: const LiquidRoundedSuperellipse(borderRadius: 28),
                    settings: _glass,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Text(
                        link[0],
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _blob(Color color, double size) => Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(colors: [color.withValues(alpha: 0.35), Colors.transparent]),
        ),
      );
}