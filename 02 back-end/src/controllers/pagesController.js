exports.home = (req, res) => {
  res.render('pages/Home', {title: 'Home'})
}

exports.about = (req, res) => {
  res.render('pages/About', {title: 'Portfolio: About'})
}

exports.contact = (req, res) => {
  res.render('pages/Contact', {title: 'Portfolio: Contact'})
}

exports.portfolio = (req, res) => {
  res.render('pages/Portfolio', {title: 'Portfolio: Portfolio'})
}

exports.website = (req, res) => {
  res.render('pages/Project-Website', {title: 'Website'})
}

exports.marketing = (req, res) => {
  res.render('pages/Project-Marketing', {title: 'Marketing'})
}

exports.branding = (req, res) => {
  res.render('pages/Project-Branding', {title: 'Branding'})
}

exports.photo_edition = (req, res) => {
  res.render('pages/Project-Photo-Edition', {title: 'Photo-Edition'})
}