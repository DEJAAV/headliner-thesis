describe('front-end routes in app.js', function() {
  var $route;
  beforeEach(module('headliner'));
  beforeEach(inject(function($injector) {
    $route = $injector.get('$route');
  }));

  // AUTH ROUTES 
  it("Should have root ('/') route that is linked to the landing page",
    function() {
      expect($route.routes['/']).to.be.ok();
      expect($route.routes['/'].controller).to.be('AuthController');
      expect($route.routes['/'].templateUrl).to.be('app/auth/landing.html');
    });
  it('Should have /login route, template, and controller', function() {
    expect($route.routes['/login']).to.be.ok();
    expect($route.routes['/login'].controller).to.be('AuthController');
    expect($route.routes['/login'].templateUrl).to.be('app/auth/login.html');
  });
  it('Should have /signup route, template, and controller', function() {
    expect($route.routes['/signup']).to.be.ok();
    expect($route.routes['/signup'].controller).to.be('AuthController');
    expect($route.routes['/signup'].templateUrl).to.be('app/auth/signup.html');
  });
  it('Should have /select route, template, and controller', function() {
    expect($route.routes['/select']).to.be.ok();
    expect($route.routes['/select'].controller).to.be('AuthController');
    expect($route.routes['/select'].templateUrl).to.be('app/auth/signup-select.html');
  });
  it('Should have /signup-venue route, template, and controller', function() {
    expect($route.routes['/signup-venue']).to.be.ok();
    expect($route.routes['/signup-venue'].controller).to.be('AuthController');
    expect($route.routes['/signup-venue'].templateUrl).to.be('app/auth/signup-venue/signup-venue.html');
  });
  it('Should have /signup-artist route, template, and controller', function() {
    expect($route.routes['/signup-artist']).to.be.ok();
    expect($route.routes['/signup-artist'].controller).to.be('AuthController');
    expect($route.routes['/signup-artist'].templateUrl).to.be('app/auth/signup-artist/signup-artist.html');
  });
  it('Should have /signout route, template, and controller', function() {
    expect($route.routes['/signout']).to.be.ok();
    expect($route.routes['/signout'].controller).to.be('AuthController');
    expect($route.routes['/signout'].templateUrl).to.be('app/auth/landing.html');
  });

  // VENUE FORM PARTIAL ROUTES (NESTED FORM VIEWS) 
  it('Should have /signup-venue/basic route and template',
    function() {
      expect($route.routes['/signup-venue/basic']).to.be.ok();
      expect($route.routes['/signup-venue/basic'].templateUrl).to.be('app/auth/signup-venue/signup-venue-basic.html');
    });
  it('Should have /signup-venue/more route and template',
    function() {
      expect($route.routes['/signup-venue/more']).to.be.ok();
      expect($route.routes['/signup-venue/more'].templateUrl).to.be('app/auth/signup-venue/signup-venue-more.html');
    });
  it('Should have /signup-venue/about route and template',
    function() {
      expect($route.routes['/signup-venue/about']).to.be.ok();
      expect($route.routes['/signup-venue/about'].templateUrl).to.be('app/auth/signup-venue/signup-venue-about.html');
    });
  it('Should have /signup-venue/contact route and template',
    function() {
      expect($route.routes['/signup-venue/contact']).to.be.ok();
      expect($route.routes['/signup-venue/contact'].templateUrl).to.be('app/auth/signup-venue/signup-venue-contact.html');
    });
  it('Should have /signup-venue/terms route and template',
    function() {
      expect($route.routes['/signup-venue/terms']).to.be.ok();
      expect($route.routes['/signup-venue/terms'].templateUrl).to.be('app/auth/signup-venue/signup-venue-terms.html');
    });

  // ARTIST FORM PARTIAL ROUTES (NESTED FORM VIEWS)
  it('Should have /signup-artist/file1 route and template',
    function() {
      expect($route.routes['/signup-artist/file1']).to.be.ok();
      expect($route.routes['/signup-artist/file1'].templateUrl).to.be('app/auth/signup-artist/signup-artist-file1.html');
    });
  it('Should have /signup-artist/file2 route and template',
    function() {
      expect($route.routes['/signup-artist/file2']).to.be.ok();
      expect($route.routes['/signup-artist/file2'].templateUrl).to.be('app/auth/signup-artist/signup-artist-file2.html');
    });
  it('Should have /signup-artist/file3 route and template',
    function() {
      expect($route.routes['/signup-artist/file3']).to.be.ok();
      expect($route.routes['/signup-artist/file3'].templateUrl).to.be('app/auth/signup-artist/signup-artist-file3.html');
    });
  it('Should have /signup-artist/file4 route and template',
    function() {
      expect($route.routes['/signup-artist/file4']).to.be.ok();
      expect($route.routes['/signup-artist/file4'].templateUrl).to.be('app/auth/signup-artist/signup-artist-file4.html');
    });
  it('Should have /signup-artist/file5 route and template',
    function() {
      expect($route.routes['/signup-artist/file5']).to.be.ok();
      expect($route.routes['/signup-artist/file5'].templateUrl).to.be('app/auth/signup-artist/signup-artist-file5.html');
    });

  // HOMEPAGE ROUTES 
  it('Should have /homepage-artist route, template and controller',
    function() {
      expect($route.routes['/homepage-artist']).to.be.ok();
      expect($route.routes['/homepage-artist'].controller).to.be('HomepageController');
      expect($route.routes['/homepage-artist'].templateUrl).to.be('app/homepage/homepage-artist.html');
    });
  it('Should have /homepage-venue route, template, and controller',
    function() {
      expect($route.routes['/homepage-venue']).to.be.ok();
      expect($route.routes['/homepage-venue'].controller).to.be('HomepageController');
      expect($route.routes['/homepage-venue'].templateUrl).to.be('app/homepage/homepage-venue.html');
    });
});