import React, { useState, useEffect } from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const generateRandomAvatars = async () => {
      try {
        const avatarList = [];
        for (let i = 0; i < 3; i++) {
          const randomAvatarUrl = generateRandomAvatarUrl();
          avatarList.push(randomAvatarUrl);
        }
        setAvatars(avatarList);
      } catch (error) {
        console.error('Error al generar avatares:', error);
      }
    };

    generateRandomAvatars();
  }, []);

  const generateRandomAvatarUrl = () => {
    const avatarStyle = 'Circle';
    const topTypes = ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'];
    const accessoriesTypes = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'];
    const hairColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'];
    const facialHairTypes = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum'];
    const clothesTypes = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'];
    const eyeTypes = ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'];
    const eyebrowTypes = ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'];
    const mouthTypes = ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'];
    const skinColors = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];

    const randomTopType = topTypes[Math.floor(Math.random() * topTypes.length)];
    const randomAccessoriesType = accessoriesTypes[Math.floor(Math.random() * accessoriesTypes.length)];
    const randomHairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const randomFacialHairType = facialHairTypes[Math.floor(Math.random() * facialHairTypes.length)];
    const randomClotheType = clothesTypes[Math.floor(Math.random() * clothesTypes.length)];
    const randomEyeType = eyeTypes[Math.floor(Math.random() * eyeTypes.length)];
    const randomEyebrowType = eyebrowTypes[Math.floor(Math.random() * eyebrowTypes.length)];
    const randomMouthType = mouthTypes[Math.floor(Math.random() * mouthTypes.length)];
    const randomSkinColor = skinColors[Math.floor(Math.random() * skinColors.length)];

    return `https://avataaars.io/?avatarStyle=${avatarStyle}&topType=${randomTopType}&accessoriesType=${randomAccessoriesType}&hairColor=${randomHairColor}&facialHairType=${randomFacialHairType}&clotheType=${randomClotheType}&eyeType=${randomEyeType}&eyebrowType=${randomEyebrowType}&mouthType=${randomMouthType}&skinColor=${randomSkinColor}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="mb-4">
          <Col className="text-start">
            <h1>Bienvenido...</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="text-center">
            <Carousel>
              {avatars.map((avatar, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block mx-auto mb-3"
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    style={{ maxWidth: "200px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to="/login">
              <Button variant="primary" className="m-2">Iniciar sesión</Button>
            </Link>
            <Link to="/registrar">
              <Button variant="secondary" className="m-2">Registrarse</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
