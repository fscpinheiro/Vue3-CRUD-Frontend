<template>  
  <div class="container-fluid">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="https://www.upd8.com.br/content/agency2/images/logo_upd8_stick2.jpg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          UPD8
        </a>
      </div>
    </nav>
    <div class="row">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Painel</a></li>
            <li class="breadcrumb-item active" aria-current="page">Clientes</li>
          </ol>
        </nav>
      </div>
      <div class="col-12">
        <ClienteCrud></ClienteCrud>
      </div>
    </div>
  </div>
  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import 'popper.js';
import ClienteCrud from './components/ClienteCrud.vue'

export default {
  name: 'App',
  components: {
    ClienteCrud
  }
}
</script>


