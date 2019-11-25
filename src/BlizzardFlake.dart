import 'dart:html';

import 'BlizzardConfiguration.dart';

class BlizzardFlake {
  
  final String character = '&bull;';
  final String color = '#fff';
  final double flakeWidth = 8;
  final double flakeHeight = 8;
  final double zIndex = 0;
  final List<double> verticalAmplifications = [
    1,
    1.2,
    1.4,
    1.6,
    1.8
  ];

  final double x;
  final double y;
  final BlizzardConfiguration configuration;

  DivElement _flakeElement;
  bool _active = false;
  bool _melting = false;
  
  BlizzardFlake({
    this.x,
    this.y,
    this.configuration
  }) {
    _flakeElement = document.createElement('div');
    _flakeElement.innerHtml = character;
    this._setElementStyle();
  }

  DivElement get element => this._flakeElement;

  void _setElementStyle() {
    this._flakeElement.style.color = color;
    this._flakeElement.style.position = 'absolute';
    this._flakeElement.style.transform = 'translate3d(0px, 0px, 0px)';
    this._flakeElement.style.width = this.flakeWidth.toString() + 'px';
    this._flakeElement.style.height = this.flakeHeight.toString() + 'px';
    this._flakeElement.style.fontFamily = 'arial,verdana';
    this._flakeElement.style.cursor = 'default';
    this._flakeElement.style.overflow = 'hidden';
    this._flakeElement.style.fontWeight = 'normal';
    this._flakeElement.style.zIndex = this.zIndex.toString();
  }
}