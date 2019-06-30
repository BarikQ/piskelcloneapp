const UserId = `1087138147820-h0vnaq3268gj241ctokv99ifr3jj25a3.apps.googleusercontent.com`;

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  $('.g-signin2').css('display', 'none');
  $('.userData').css('display', 'block');
  $('#userPic').attr('src', profile.getImageUrl());
  $('#email').text(profile.getEmail());
}
