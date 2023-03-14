'use strict'
$(document).ready(initPage)

function initPage() {
  renderGallery()
}

function renderGallery() {
  const projects = getProjects()
  //render projects
  var strHtmls = projects.map(project => `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-project-id=${project.id} data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img  class="portfolio-img img-fluid" src="img/portfolio/${project.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
        </div>
      </div>`)

  $('.main-proj-list').html(strHtmls)
  addEventListeners()
}

function addEventListeners() {
  $('.portfolio-link').click(onShowModal)
  $('.btn-submit').click(onSubmitForm)
}

function onShowModal() {
  const projectId = $(this).closest('.portfolio-link').data('project-id')
  console.log('projectId', projectId)
  const project = getProjectById(projectId)

  var strHtmls = `
  
            <div class="modal-body">
              <h2>${project.name}</h2>
              <p class="item-intro text-muted">${project.title}</p>
              <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.jpg" alt="">
              <p>${project.desc}</p>
              <ul class="list-inline">
                <li>Upload date: ${parseDate(project.publishedAt)}</li>
                <li><a href="${project.url}" target="_blank">Demo</a></li>
                <li>Category: ${project.labels.join(' , ')}</li>
              </ul>
              <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
            </div>
         `
  $('.modal-body').html(strHtmls)
}

function onSubmitForm(ev) {
  ev.preventDefault()
  var $name = $('.form-container #inputFullname').val()
  var $email = $('.form-container #inputEmail').val()
  var $subject = $('.form-container  #inputSubject').val()
  var $message = $('.form-container  #inputMessage').val()
  // regex to validate email
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  console.log($name, $email, $subject, $message)
  if (!$name || !$email || !$subject || !$message) {
    alert('Please fill all the fields')
    return
  }
  if (!emailRegex.test($email)) {
    alert('Please enter a valid email address')
    return
  }

  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ibalakin@gmail.com&su=${$subject}&body=${$message}`)
  $('#inputFullname').val('')
  $('#inputEmail').val('')
  $('#inputSubject').val('')
  $('#inputMessage').val('')
  openCanvas()
}

function parseDate(timestamp) {
  const date = new Date(timestamp)
  // Return format Mon Year
  return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`
}