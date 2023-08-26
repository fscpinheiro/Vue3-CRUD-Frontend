<template>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">CPF</th>
          <th scope="col">Nascimento</th>
          <th scope="col">Sexo</th>
          <th scope="col">Estado</th>
          <th scope="col">Cidade</th>
          <th scope="col">Endereço</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody v-if="clientes && clientes.length > 0">
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.cpf }}</td>
          <td>{{ cliente.nascimento }}</td>
          <td>{{ cliente.sexo }}</td>
          <td>{{ cliente.estado }}</td>
          <td>{{ cliente.cidade }}</td>
          <td>{{ cliente.endereco }}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                <button type="button" class="btn btn-outline-info"  @click="editCliente(cliente.id)">Editar</button>
                <button type="button" class="btn btn-outline-danger" @click="deleteCliente(cliente.id)">Excluir</button>            
            </div>
        </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr><td colspan="8">Nenhum dado encontrado.</td></tr>
      </tbody>
    </table>
  </template>
  
  <script>
    import axios from 'axios'

    export default {
        props: {
        clientes: Array
        },
        methods: {
            deleteCliente(id){
                if(confirm('Tem certeza de que deseja excluir este cliente?')){
                    axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`)
                    .then(() => {
                        console.log('OK');
                        this.$emit('cliente-deleted');
                        this.$emit('show-alert', 'success', 'Cliente excluído com sucesso.');
                    }).catch(() => {
                        console.log('Ops!');
                    });
                }
            },
            editCliente(id) {
                axios.get(`http://127.0.0.1:8000/api/clientes/${id}`)
                .then(response => {
                    const cliente = response.data.data;
                    this.$emit('cliente-edicao', cliente); // Emitir para o componente pai
                }).catch(() => {
                    console.log('Erro ao buscar dados do cliente para edição.');
                });
            }
        }
    }
  </script>