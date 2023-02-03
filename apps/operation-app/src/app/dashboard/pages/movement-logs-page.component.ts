import { AfterViewInit, Component } from '@angular/core';
declare let window: any;
declare let Litepicker: any;
@Component({
  selector: 'operation-management-movement-log',
  template: `
    <div class="page-header d-print-none">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">Movement logs filters</h2>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="page-body">
      <div class="container-xl">
        <div class="row g-4">
          <div class="col-3">
            <form action="./" method="get" autocomplete="off" novalidate="">
              <div class="subheader mb-2">Team Name</div>
              <div class="mb-3">
                <input class="form-control" type="text" />
              </div>
              <div class="subheader mb-2">User Name</div>
              <div class="mb-3">
                <input class="form-control" type="text" />
              </div>
              <div class="subheader mb-2">Dates</div>
              <div class="row g-2 align-items-center mb-3">
                <div class="col">
                  <div class="input-group">
                    <div class="input-icon">
                      <span class="input-icon-addon"
                        ><!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                          ></path>
                          <path d="M16 3l0 4"></path>
                          <path d="M8 3l0 4"></path>
                          <path d="M4 11l16 0"></path>
                          <path d="M11 15l1 0"></path>
                          <path d="M12 15l0 3"></path>
                        </svg>
                      </span>
                      <input
                        class="form-control"
                        placeholder="Select a date"
                        id="datepicker-start-date"
                        value=""
                        spellcheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-auto">—</div>
                <div class="col">
                  <div class="input-group">
                    <div class="input-icon">
                      <span class="input-icon-addon"
                        ><!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                          ></path>
                          <path d="M16 3l0 4"></path>
                          <path d="M8 3l0 4"></path>
                          <path d="M4 11l16 0"></path>
                          <path d="M11 15l1 0"></path>
                          <path d="M12 15l0 3"></path>
                        </svg>
                      </span>
                      <input
                        class="form-control"
                        placeholder="Select a date"
                        id="datepicker-finish-date"
                        value=""
                        spellcheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-5">
                <button class="btn btn-primary w-100">Confirm changes</button>
                <a href="#" class="btn btn-link w-100"> Reset to defaults </a>
              </div>
            </form>
          </div>
          <div class="col-9">
            <div class="row row-cards">
              <div class="col-sm-6 col-lg-4">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <div>Coca-Cola-Team 8 => Coca-Cola-Team 9</div>
                        <div class="text-muted">
                          EL USUARIO Dwigth Astacio QUE ESTABA EN EL EQUIPO
                          Coca-Cola-Team 8 PASARÁ A SER PARTE DEL EQUIPO
                          Coca-Cola-Team 9 DESDE 01-02-2023 HASTA 01-04-2023.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MovementLogsPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Litepicker({
      element: document.getElementById('datepicker-start-date'),
      buttonText: {
        previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
        nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
      },
    });

    new Litepicker({
        element: document.getElementById('datepicker-finish-date'),
        buttonText: {
          previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
          nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
        },
      });
  }
}
