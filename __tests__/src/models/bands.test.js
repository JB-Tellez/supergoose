import Musician from '../../../src/models/musicians';
import Band from '../../../src/models/bands';
import Roadie from '../../../src/models/roadies';
import testHelper from '../../../scripts/test-helper';

afterEach(testHelper.afterEach);


describe('musician + band', () => {

  it('should create a musician that belongs to band', () => {

    Band.create({name:'Foo Fighters'})
      .then(band => {
        Musician.create({name:'Dave Grohl', band: band._id})
          .then(m => {
            Musician
              .findById(m._id)
              .populate('band')
              .exec()
              .then(mu => {
                expect(mu.band.name).toBe('Foo Fighters');
              });
          });
      });
  });

  it('should do musician + band - async style', async () => {

    const fooFighters = await Band.create({name:'Foo Fighters'});

    const dave = await Musician.create({name: 'Dave Grohl', band: fooFighters._id});

    const popDave = await Musician.findById(dave._id).populate('band').exec();

    expect(popDave.band.name).toBe('Foo Fighters');
  });
});
/*
describe('Band model', () => {

  it('should be defined', () => {
    expect(Band).toBeDefined();
  });

  it('should create', () => {
    return Band.create({
      name: 'Spinal Tap',
    }).then(band => {
      expect(band.name).toBe('Spinal Tap');
    }).catch(err => fail(err));
  });

  it('should create async', async () => {
    
    const band = await Band.create({name: 'Spinal Tap'});

    expect(band.name).toBe('Spinal Tap');

  });

  it('should get one', () => {

    const rawBand = {
      name: 'Spinal Tap',
    };

    return Band.create(rawBand).then(band => {

      return Band.findById(band._id).then(found => {
        expect(found.name).toBe(rawBand.name);
      });
    });
  });

  it('should track creations when getting all - async/await style', async () => {

    await Band.find().then(bands => expect(bands.length).toBe(0));

    await Band.create({
      name: 'Fugazi',
    });

    await Band.find().then(bands => expect(bands.length).toBe(1));

  });

  it('should track creations when getting all - promise style', () => {

    return Band.find().then(bands => {

      expect(bands.length).toBe(0);

      return Band.create({
        name: 'Fugazi',
      }).then(() => {

        return Band.find().then(bands => {

          expect(bands.length).toBe(1);

        });
      });
    });
  });
});

describe('Band with relationships', () => {

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

  it('should find the musicians in a band', async () => {

    const beeGees = await Band.create({name: 'Bee Gees'});

    await Musician.create({name : 'Barry', band: beeGees._id});
    await Musician.create({name : 'Robin', band: beeGees._id});
    await Musician.create({name : 'Maurice', band: beeGees._id});

    const stooges = await Band.create({name: 'The Stooges'});
    await Musician.create({name: 'Iggy Pop', band: stooges._id});

    await Musician.find({band:beeGees._id}).populate('band').exec().then(musicians => {
      expect(musicians.length).toEqual(3);
      expect(musicians[0].band.name).toBe('Bee Gees');
    });
  });
});
*/