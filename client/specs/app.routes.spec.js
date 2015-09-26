describe('front-end routes in app.js', function() {
  var $route;
  beforeEach(module('headliner'));

  beforeEach(inject(function($injector) {
    $route = $injector.get('$route');
  }));

  it("Should have root ('/') route that is linked to the landing page",
    function() {
      expect($route.routes['/']).to.be.ok();
      expect($route.routes['/'].controller).to.be('AuthController');
      expect($route.routes['/'].templateUrl).to.be(
        'app/auth/landing.html');
    });

  it('Should have /signup-artist route, template, and controller', function() {
    expect($route.routes['/signup-artist']).to.be.ok();
    expect($route.routes['/signup-artist'].controller).to.be('AuthController');
    expect($route.routes['/signup-artist'].templateUrl).to.be(
      'app/auth/signup-artist.html');
  });

  it('Should have /signup-venue route, template, and controller', function() {
    expect($route.routes['/signup-venue']).to.be.ok();
    expect($route.routes['/signup-venue'].controller).to.be('AuthController');
    expect($route.routes['/signup-venue'].templateUrl).to.be(
      'app/auth/signup-venue.html');
  });

  it('Should have /login route, template, and controller', function() {
    expect($route.routes['/login']).to.be.ok();
    expect($route.routes['/login'].controller).to.be(
      'AuthController');
    expect($route.routes['/login'].templateUrl).to.be(
      'app/auth/login.html');
  });

  it('Should have /find-bands route, template, and controller', function() {
    expect($route.routes['/find-bands']).to.be.ok();
    expect($route.routes['/find-bands'].controller).to.be('AuthController');
    expect($route.routes['/find-bands'].templateUrl).to.be(
      'app/search/findABand.html');
  });

  it('Should have /find-venues route, template, and controller', function() {
    expect($route.routes['/find-venues']).to.be.ok();
    expect($route.routes['/find-venues'].controller).to.be('AuthController');
    expect($route.routes['/find-venues'].templateUrl).to.be(
      'app/search/findAVenue.html');
  });

  it('Should have /homepage-artist route, template, and controller', function() {
    expect($route.routes['/homepage-artist']).to.be.ok();
    expect($route.routes['/homepage-artist'].controller).to.be('HomepageController');
    expect($route.routes['/homepage-artist'].templateUrl).to.be(
      'app/homepage/homepage-artist.html');
  }); 

  it('Should have /homepage-venue route, template, and controller', function() {
    expect($route.routes['/homepage-venue']).to.be.ok();
    expect($route.routes['/homepage-venue'].controller).to.be('HomepageController');
    expect($route.routes['/homepage-venue'].templateUrl).to.be(
      'app/homepage/homepage-venue.html');
  });    


  it('Should have /signout route, template, and controller', function() {
    expect($route.routes['/signout']).to.be.ok();
    expect($route.routes['/signout'].controller).to.be('AuthController');
    expect($route.routes['/signout'].templateUrl).to.be(
      'app/auth/landing.html');
  });

});
