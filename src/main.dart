import 'Blizzard.dart';
import 'BlizzardConfiguration.dart';

void main(List<String> args) {

  BlizzardConfiguration configuration = BlizzardConfiguration();

  Blizzard blizzard = Blizzard(configuration);

  blizzard.start();
}