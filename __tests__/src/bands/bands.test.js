import Musician from '../../../src/musicians/model';
import Band from '../../../src/bands/model';
import Roadie from '../../../src/roadies/model';

describe('band + roadie', () => {

  it('should have a Roadie as Id', async () => {

    const band = await Band.create({name:'Pink Floyd'});

    const roadie = await Roadie.create({name: 'David Gilmour', band: band._id});
    
    expect(roadie.band._id).toBe(band._id);
     
  });

  it('should have Roadie as populated object', async () => {
    
    const band = await Band.create({name:'Pink Floyd'});

    const roadie = await Roadie.create({name: 'David Gilmour', band: band._id});

    const foundRoadie = await Roadie.findById(roadie._id).populate('band').exec();

    expect(foundRoadie.band.name).toBe(band.name);

  });
});

describe('band + musician', () => {

  it('should do musician + band - async style', async () => {

    const fooFighters = await Band.create({name:'Foo Fighters'});

    const dave = await Musician.create({name: 'Dave Grohl', band: fooFighters._id});

    const popDave = await Musician.findById(dave._id).populate('band').exec();

    expect(popDave.band.name).toBe('Foo Fighters');
  });

  it('should find the musicians in a band', async () => {

    const beeGees = await Band.create({name: 'Bee Gees'});

    await Musician.create({name : 'Barry', band: beeGees._id});
    await Musician.create({name : 'Robin', band: beeGees._id});
    await Musician.create({name : 'Maurice', band: beeGees._id});

    const stooges = await Band.create({name: 'The Stooges'});
    await Musician.create({name: 'Iggy Pop', band: stooges._id});

    const musicians = await Musician.find({band:beeGees._id}).populate('band').exec();
    
    expect(musicians.length).toEqual(3);
    expect(musicians[0].band.name).toBe('Bee Gees');
    
  });
});

describe('Band model', () => {

  /* NOTE: you probably won't do tests like these
  * since they're really testing Mongoose internals
  * where we want to test our code.
  * But including them for instructional purposes */

  it('should be defined', () => {
    expect(Band).toBeDefined();
  });

  it('should create', async () => {

    const band = await Band.create({name: 'Spinal Tap'});

    expect(band.name).toBe('Spinal Tap');

  });

  it('should get one', async () => {

    const rawBand = {
      name: 'Spinal Tap',
    };

    const band = await Band.create(rawBand);

    const foundBand = await Band.findById(band._id);

    expect(foundBand.name).toEqual(band.name);
  });

  it('should track creations when getting all - async/await style', async () => {

    let bands = await Band.find();
    
    expect(bands.length).toBe(0);

    await Band.create({
      name: 'Fugazi',
    });

    bands = await Band.find();
    
    expect(bands.length).toBe(1);

  });

  it('should track creations when getting all - promise style', () => {

    return Band
      .find()
      .then(bands => expect(bands.length).toBe(0))
      .then(() => Band.create({ name: 'Fugazi' }))
      .then(() => Band.find())
      .then(bands => expect(bands.length).toBe(1));

  });
});
