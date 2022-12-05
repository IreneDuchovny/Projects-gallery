// setup listner for img



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
          <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="">
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
}

function onShowModal() {
  const projectId = $(this).closest('.portfolio-link').data('project-id')
  console.log('projectId', projectId)
  const project = getProjectById(projectId)

  var strHtmls = `
  <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="close-modal" data-dismiss="modal">
        <div class="lr">
          <div class="rl"></div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="modal-body">
              <!-- Project Details Go Here -->
              <h2>${project.name}</h2>
              <p class="item-intro text-muted">${project.title}</p>
              <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.png" alt="">
              <p>${project.desc}</p>
              <ul class="list-inline">
                <li>Date: ${project.publishedAt}</li>
                <li><a href="${project.url}" target="_blank">Demo Github</a></li>
                <li>Category: ${project.labels.join(' , ')}</li>
              </ul>
              <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  $('.modals').html(strHtmls)
}