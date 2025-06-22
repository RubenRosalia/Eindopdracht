import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Player } from './player'

const Resources = {
    Player: new ImageSource('images/player.png'),
    BG: new ImageSource('images/background.jpg'),
    Floor: new ImageSource('images/floor.jpg'),
    Block: new ImageSource('images/block.png'),
    Fish: new ImageSource('images/fish.png'),
    Mine: new ImageSource('images/mine.png'),
    Coin: new ImageSource('images/coin.png'),


}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}

const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }