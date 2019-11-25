class BlizzardConfiguration {

  final bool autoStart;
  final bool followMouse;
  final bool meltEffect;
  final bool freezeOnBlur;

  final String elementId;

  final int maximumFlakes;
  final int maximumFallingFlakes;
  final int animationInterval;

  BlizzardConfiguration({
    this.autoStart,
    this.followMouse,
    this.meltEffect,
    this.freezeOnBlur,
    this.maximumFlakes,
    this.maximumFallingFlakes,
    this.animationInterval,
    this.elementId
  });
}