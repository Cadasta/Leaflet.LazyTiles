describe('Tile', function() {
  var tile;

  beforeEach(function() {
    tile = new Tile(0, 0, 0, 10);
  });

  describe('#findPathToChild()', function() {
    it('should return Tile(0, 0, 1) at zoom level 0', function() {
      const z1 = tile.findPathToChild(1, 5, 3);
      z1.x.should.equal(0);
      z1.y.should.equal(1);
      z1.z.should.equal(1);
    });

    it('should return Tile(0, 2, 2) at zoom level 1', function() {
      const z1 = tile.findPathToChild(1, 5, 3);
      const z2 = z1.findPathToChild(1, 5, 3);
      z2.x.should.equal(0);
      z2.y.should.equal(2);
      z2.z.should.equal(2);
    });

    it('should return Tile(1, 5, 3) at zoom level 2', function() {
      const z1 = tile.findPathToChild(1, 5, 3);
      const z2 = z1.findPathToChild(1, 5, 3);
      const z3 = z2.findPathToChild(1, 5, 3);
      z3.x.should.equal(1);
      z3.y.should.equal(5);
      z3.z.should.equal(3);
    });

    it('should return Tile(2, 11, 4) at zoom level 3', function() {
      const z1 = tile.findPathToChild(2, 11, 4);
      const z2 = z1.findPathToChild(2, 11, 4);
      const z3 = z2.findPathToChild(2, 11, 4);
      const z4 = z3.findPathToChild(2, 11, 4);
      z4.x.should.equal(2);
      z4.y.should.equal(11);
      z4.z.should.equal(4);
    });
  });

  describe('#load()', function() {
    it('should mark only Tile(1, 5, 3) as loaded', function() {
      tile.load(1,5,3);
      const z1 = tile.findPathToChild(1, 5, 3);
      z1.loaded.should.equal(false);
      const z2 = z1.findPathToChild(1, 5, 3);
      z2.loaded.should.equal(false);
      const z3 = z2.findPathToChild(1, 5, 3);
      z3.loaded.should.equal(true);
      const z4 = z3.findPathToChild(2, 11, 4);
      z4.loaded.should.equal(false);
    });
  });

  describe('#isLoaded()', function() {
    it('should return Tile(1, 5, 3) and Tile(2, 11, 4)  as loaded', function() {
      tile.load(1,5,3);

      const z0 = tile.isLoaded(0, 0, 0);
      z0.should.equal(false);

      const z1 = tile.isLoaded(0, 0, 1);
      z1.should.equal(false);

      const z2 = tile.isLoaded(0, 2, 2);
      z2.should.equal(false);

      const z3 = tile.isLoaded(1, 5, 3);
      z3.should.equal(true);

      const z4 = tile.isLoaded(2, 11, 4);
      z4.should.equal(true);
    });
  });

  describe('#loadFromChild()', function() {
    it('should mark Tile(1, 5, 3) as loaded when (2, 10, 4), (2, 11, 4), (3, 10, 4), (3, 11, 4) are loaded', function() {
      tile.isLoaded(1, 5, 3).should.equal(false);

      tile.load(2, 10, 4);
      tile.isLoaded(2, 10, 4).should.equal(true);
      tile.isLoaded(2, 11, 4).should.equal(false);
      tile.isLoaded(3, 10, 4).should.equal(false);
      tile.isLoaded(3, 11, 4).should.equal(false);
      tile.isLoaded(1, 5, 3).should.equal(false);
      
      tile.load(2, 11, 4);
      tile.isLoaded(2, 10, 4).should.equal(true);
      tile.isLoaded(2, 11, 4).should.equal(true);
      tile.isLoaded(3, 10, 4).should.equal(false);
      tile.isLoaded(3, 11, 4).should.equal(false);
      tile.isLoaded(1, 5, 3).should.equal(false);

      tile.load(3, 10, 4);
      tile.isLoaded(2, 10, 4).should.equal(true);
      tile.isLoaded(2, 11, 4).should.equal(true);
      tile.isLoaded(3, 10, 4).should.equal(true);
      tile.isLoaded(3, 11, 4).should.equal(false);
      tile.isLoaded(1, 5, 3).should.equal(false);

      tile.load(3, 11, 4);
      tile.isLoaded(2, 10, 4).should.equal(true);
      tile.isLoaded(2, 11, 4).should.equal(true);
      tile.isLoaded(3, 10, 4).should.equal(true);
      tile.isLoaded(3, 11, 4).should.equal(true);
      tile.isLoaded(1, 5, 3).should.equal(true);
    });
  });
});
