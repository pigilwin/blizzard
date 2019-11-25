import 'dart:html';

import 'BlizzardConfiguration.dart';
import 'BlizzardFlake.dart';

class Blizzard {

  final BlizzardConfiguration configuration;

  bool _isRunning = false;
  List<BlizzardFlake> _flakes;
  HtmlElement _element;
  
  Blizzard(this.configuration){
    this._element = _setElement();
  }

  void start() {

  }

  void stop() {

  }

  HtmlElement _setElement() {
    String elementId = this.configuration.elementId;
    if (elementId == null) {
      return document.body;
    }
    HtmlElement element = document.querySelector("#"  + elementId);
    if (element == null) {
      element = document.body;
    }
    return element;
  }
}