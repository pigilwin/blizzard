import 'dart:html';
import 'BlizzardFlake.dart';

class Blizzard {

  final int amountOfFlakes = 600;

  List<BlizzardFlake> _flakes = [];
  CanvasElement _canvasElement;
  CanvasRenderingContext2D _canvasRenderingContext2D;
  int innerWidth = 0;
  int innerHeight = 0;
  bool hasBeenSetup = false;
  
  Blizzard(){
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    this._attachCanvasToDocumentBody();
  }

  void start() {
    if (!this.hasBeenSetup) {
      this._setUp();
    }
  }

  void _setUp() {
    if (this.hasBeenSetup) {
      return;
    }
    for(int i = 0; i < this.amountOfFlakes; i++) {
      BlizzardFlake flake = BlizzardFlake();
      this._flakes.add(flake);
    }
    this.hasBeenSetup = true;
  }

  void _attachCanvasToDocumentBody() {
    this._canvasElement = document.createElement('canvas');
    this._canvasElement.width = this.innerWidth;
    this._canvasElement.height = this.innerHeight;
    this._canvasRenderingContext2D = this._canvasElement.getContext('2d');
    document.body.append(this._canvasElement);
  }
}