import 'dart:html';
import 'BlizzardFlake.dart';

class Blizzard {

  final int amountOfFlakes = 100;

  List<BlizzardFlake> _flakes;
  CanvasElement _canvasElement;
  CanvasRenderingContext2D _canvasRenderingContext2D;
  int innerWidth = 0;
  int innerHeight = 0;
  
  Blizzard(){
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    this._attachCanvasToDocumentBody();
  }

  void start() {

  }

  void _attachCanvasToDocumentBody() {
    this._canvasElement = document.createElement('canvas');
    this._canvasElement.width = this.innerWidth;
    this._canvasElement.height = this.innerHeight;
    this._canvasRenderingContext2D = this._canvasElement.getContext('2d');
    document.body.append(this._canvasElement);
  }
}