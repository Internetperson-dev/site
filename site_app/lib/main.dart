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
      title: 'Internetperson-dev Useful Links',
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

  LiquidGlassSettings get _pillGlass => LiquidGlassSettings(
        glassColor: const Color(0xCC1C1C1E),
        thickness: 30,
        blur: 2,
        chromaticAberration: .01,
        lightIntensity: 0.18,
        saturation: 1.2,
      );

  @override
  Widget build(BuildContext context) {
    return GlassScaffold(
      background: Container(
        decoration: const BoxDecoration(
          gradient: RadialGradient(
            center: Alignment(-0.6, -0.8),
            radius: 1.3,
            colors: [Color(0xFF1F1F1F), Color(0xFF121212)],
          ),
        ),
      ),
      settings: _pillGlass,
      statusBarStyle: GlassStatusBarStyle.light,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              children: [
                const Text(
                  'Useful Links',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 34,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 24),
                GlassButton.custom(
                  onTap: () {},
                  quality: GlassQuality.premium,
                  useOwnLayer: true,
                  width: double.infinity,
                  height: 52,
                  shape: const LiquidRoundedSuperellipse(borderRadius: 26),
                  settings: _pillGlass,
                  child: const Text('/etc',
                      style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w600)),
                ),
                const SizedBox(height: 12),
                for (final link in _links) ...[
                  GlassButton.custom(
                    onTap: () => _openUrl(link[1]),
                    quality: GlassQuality.premium,
                    useOwnLayer: true,
                    width: double.infinity,
                    height: 52,
                    shape: const LiquidRoundedSuperellipse(borderRadius: 26),
                    settings: _pillGlass,
                    child: Text(
                      link[0],
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w500),
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}