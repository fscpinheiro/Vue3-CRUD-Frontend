<template>
    <vue-basic-alert :duration="500" :closeIn="5000" ref="alert" />

    <div class="card mb-3">
        <h5 class="card-header d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#clienteForm">
            Cadastro Cliente
            <button class="btn btn-link p-0" type="button" data-bs-toggle="collapse" data-bs-target="#clienteForm">
                <i class="bi bi-chevron-down"></i>
            </button>
            
        </h5>
        <div class="card-body collapse" id="clienteForm">
            <form @submit.prevent="submitForm">
                <div class="row">
                    <input type="hidden" v-model="clienteIdParaEdicao" />
                    <div class="col-2 mb-3">
                        <label for="cpf" class="col-sm-2 col-form-label">CPF</label>
                        <input type="text" class="form-control" id="cpf" v-model="form.cpf">                                            
                    </div>
                    <div class="col-4 mb-3">
                        <label for="nome" class="col-sm-2 col-form-label">Nome </label>
                        <input type="text" class="form-control" id="nome" v-model="form.nome">                                            
                    </div>
                    <div class="col-3 mb-3">
                        <label for="nascimento" class="col-sm-3 col-form-label">Nascimento</label>
                        <input type="date" class="form-control" id="nascimento" v-model="form.nascimento">                                            
                    </div>
                    <div class="col-3 mb-3">
                        <label for="sexo" class="col-sm-2 col-form-label">Sexo </label>
                        <div class="col" style="margin-top: 8px;">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="sexo" id="sexoM" value="M" v-model="form.sexo">                        
                                <label class="form-check-label" for="inlineRadio1">Masculino</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="sexo" id="sexoF" value="F" v-model="form.sexo">                        
                                <label class="form-check-label" for="inlineRadio2">Feminino</label>
                            </div>                              
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mb-3">
                        <label for="endereco" class="col-sm-2 col-form-label">Endereço </label>
                        <input type="text" class="form-control" id="endereco" v-model="form.endereco">                                            
                    </div>
                    <div class="col-4 mb-3">
                        <label for="estado" class="col-sm-2 col-form-label">Estado </label>
                        <select class="form-select" id="estado" v-model="form.estado">
                            <option value="SP">SP</option>
                        </select>           
                    </div>
                    <div class="col-4 mb-3">
                        <label for="cidade" class="col-sm-2 col-form-label">Cidade </label>
                        <select class="form-select" id="cidade" v-model="form.cidade">
                            <option value="Piracicaba">Piracicaba</option>
                            <option value="Campinas">Campinas</option>
                            <option value="São Paulo">São Paulo</option>
                        </select>           
                    </div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-primary">Salvar</button>
                        <button type="button" class="btn btn-secondary" @click="limparForm">Limpar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="card mb-3">
        <h5 class="card-header d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#clienteGrid">
            Lista de Clientes
            <button class="btn btn-link p-0" type="button" data-bs-toggle="collapse" data-bs-target="#clienteGrid">
                <i class="bi bi-chevron-down"></i>
            </button>
        </h5>
        <div class="card-body collapse show" id="clienteGrid">
            <div v-show="erro">
                <div class="alert alert-warning" role="alert">
                    <div style="display: flex; justify-content: space-between;">
                        <span>Erro de comunicação com o servidor, aguarde alguns minutos e atualize a página!</span>
                        <button @click="refreshPage" class="btn btn-dark">Atualizar</button>
                    </div>
                </div>                
            </div> 
            
            <div class="card mb-2">
                <h6 class="card-header d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#clientebusca">
                    Cliente Consulta
                    <button class="btn btn-link p-0" type="button" data-bs-toggle="collapse" data-bs-target="#clientebusca">
                        <i class="bi bi-chevron-down"></i>
                    </button>
                </h6> 
                <div class="card-body collapse" id="clientebusca">
                    <form @submit.prevent="submitBusca">
                        <div class="row">
                            <div class="col-2 mb-3">
                                <label for="b_cpf" class="col-sm-2 col-form-label">CPF</label>
                                <input type="text" class="form-control" id="b_cpf" v-model="busca.cpf">                                            
                            </div>
                            <div class="col-4 mb-3">
                                <label for="b_nome" class="col-sm-2 col-form-label">Nome </label>
                                <input type="text" class="form-control" id="b_nome" v-model="busca.nome">                                            
                            </div>
                            <div class="col-3 mb-3">
                                <label for="b_nascimento" class="col-sm-3 col-form-label">Nascimento</label>
                                <input type="date" class="form-control" id="b_nascimento" v-model="busca.nascimento">                                            
                            </div>
                            <div class="col-3 mb-3">
                                <label for="sexo" class="col-sm-2 col-form-label">Sexo </label>
                                <div class="col" style="margin-top: 8px;">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="bsexo" id="bsexoM" value="M" v-model="busca.sexo">                        
                                        <label class="form-check-label" for="inlineRadio1">Masculino</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="bsexo" id="bsexoF" value="F" v-model="busca.sexo">                        
                                        <label class="form-check-label" for="inlineRadio2">Feminino</label>
                                    </div>                              
                                </div>
                            </div>
                            <div class="col-4 mb-3">
                                <label for="estado" class="col-sm-2 col-form-label">Estado </label>
                                <select class="form-select" id="bestado" v-model="busca.estado">
                                    <option value="">Todos</option>
                                    <option value="SP">SP</option>
                                </select>           
                            </div>
                            <div class="col-4 mb-3">
                                <label for="cidade" class="col-sm-2 col-form-label">Cidade </label>
                                <select class="form-select" id="bcidade" v-model="busca.cidade">
                                    <option value="">Todos</option>
                                    <option value="Piracicaba">Piracicaba</option>
                                    <option value="Campinas">Campinas</option>
                                    <option value="São Paulo">São Paulo</option>
                                </select>           
                            </div>


                        </div>
                        <div class="row">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" class="btn btn-primary">Pesquisar</button>
                                <button type="button" class="btn btn-secondary" @click="limparBusca">Limpar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <cliente-table :clientes="clientes" @cliente-deleted="fetchClientes" @cliente-edicao="handleClienteEdicao" @show-alert="alerta"></cliente-table>
            <div>
                <p class="d-grid gap-2 d-md-flex justify-content-md-end">Total de registros:<strong> {{ totalRegistros }}</strong></p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <span class="ml-2">Página {{ currentPage }} de {{ lastPage }}</span>
                    <div class="btn-group" role="group">
                        <button class="btn btn-outline-secondary" :disabled="currentPage === 1" @click="fetchClientes(1)" title="Primeira Página"><i class="bi bi-chevron-double-left"></i></button>
                        <button class="btn btn-outline-secondary" :disabled="!prevPageUrl" @click="fetchClientes(currentPage - 1)" title="Página Anterior"><i class="bi bi-chevron-left"></i></button>                
                        <button class="btn btn-outline-secondary" :disabled="!nextPageUrl" @click="fetchClientes(currentPage + 1)" title="Próxima Página"><i class="bi bi-chevron-right"></i></button>
                        <button class="btn btn-outline-secondary" :disabled="currentPage === lastPage" @click="fetchClientes(lastPage)" title="Última Página"><i class="bi bi-chevron-double-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
    import axios from 'axios'
    import ClienteTable from './ClienteTable.vue'
    


    export default {
        components: {
            ClienteTable
        },
        data() {
            return { 
                clientes: [],
                buscaResultados: [],
                erro: false,
                form: {
                    nome: '',
                    cpf: '',
                    nascimento: '',
                    sexo: '',
                    estado: '',
                    cidade: '',
                    endereco: ''
                },
                busca: {
                    nome: '',
                    cpf: '',
                    nascimento: '',
                    sexo: '',
                    estado: '',
                    cidade: ''
                },
                clienteIdParaEdicao: null,
                currentPage: 1, 
                lastPage: 1, 
                nextPageUrl: null, 
                prevPageUrl: null, 
                totalRegistros: 0 
            }
        },
        mounted(){
            this.fetchClientes();
        },
        methods: {
            refreshPage() {
                window.location.reload();
            },
            alerta(tipo = 'success', mensagem = '', titulo = '', opcoes = { iconSize: 35, iconType: 'solid', position: 'top right' }){
                this.$refs.alert.showAlert(tipo, mensagem, titulo, opcoes);
            },
            submitForm() {
                if (this.clienteIdParaEdicao) {
                    axios.patch(`http://127.0.0.1:8000/api/clientes/${this.clienteIdParaEdicao}`, this.form)
                    .then(response => {
                        console.log(response.data);
                        this.limparForm();
                        console.log('TESTE DE VALIDAÇÂO');
                        this.fetchClientes();
                        this.alerta('success','Dados atualizados','Aviso!');                        
                    }).catch(() => {
                        this.alerta('error','Erro de comunicação, tenten novamente mais tarde.','Aviso!');
                    });
                } else {
                    axios.post('http://127.0.0.1:8000/api/clientes', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.limparForm();
                        this.fetchClientes();
                        this.alerta('success','Cliente Salvo','Aviso!');
                    }).catch(error => {
                        console.log(error);
                        this.alerta('error','Falha de comunicação com o servidor, tente novamente mais tarde','Aviso!');
                    });
                }
                const clienteForm = document.querySelector('#clienteForm');
                const clienteGrid = document.querySelector('#clienteGrid');                
                clienteForm.classList.toggle('show');
                clienteGrid.classList.toggle('show');
            },
            submitBusca() {
                const params = {};
                if (this.busca.nome) {
                    params.nome = this.busca.nome;
                }
                if (this.busca.cpf) {
                    params.cpf = this.busca.cpf;
                }
                if (this.busca.nascimento) {
                    params.nascimento = this.busca.nascimento;
                }
                if (this.busca.sexo) {
                    params.sexo = this.busca.sexo;
                }
                if (this.busca.cidade) {
                    params.cidade = this.busca.cidade;
                }
                if (this.busca.estado) {
                    params.estado = this.busca.estado;
                }
                axios.get('http://127.0.0.1:8000/api/clientes/busca', { params })
                .then(response => {
                    if (response.data.message === 'clientes0') {
                        this.alerta('warning', 'Nenhum cliente encontrado.', 'Aviso!');
                        this.fetchClientes();
                    } else {
                        this.buscaResultados = response.data.data;
                        this.clientes = this.buscaResultados;                  
                        this.currentPage = response.data.meta.current_page;
                        this.lastPage = response.data.meta.last_page;
                        this.nextPageUrl = response.data.links.next;
                        this.prevPageUrl = response.data.links.prev;
                        this.totalRegistros = response.data.meta.total;
                        this.alerta('info','dados encontrados','Aviso!');
                    }
                })
                .catch(() => {
                    this.alerta('error','Servidor indisponivel, tente novamente mais tarde','Aviso!');
                });
            },
            limparForm() {
                this.clienteIdParaEdicao = null; 
                this.form = {
                    nome: '',
                    cpf: '',
                    nascimento: '',
                    sexo: '',
                    estado: '',
                    cidade: '',
                    endereco: ''
                }
            },
            limparBusca() {
                this.busca = {
                    nome: '',
                    cpf: '',
                    nascimento: ''                   
                };
                this.fetchClientes();
            },
            fetchClientes(page=1) {
                axios.get('http://127.0.0.1:8000/api/clientes?page='+ page)
                .then(response => {
                    this.clientes = response.data.data;
                    this.currentPage = response.data.meta.current_page;
                    this.lastPage = response.data.meta.last_page;
                    this.nextPageUrl = response.data.links.next;
                    this.prevPageUrl = response.data.links.prev;
                    this.totalRegistros = response.data.meta.total; 
                })
                .catch(() => {
                    this.erro = true;
                });
            },
            handleClienteEdicao(cliente) {
                this.clienteIdParaEdicao = cliente.id;
                this.form = {
                    cpf: cliente.cpf,
                    nome: cliente.nome,
                    nascimento: cliente.nascimento,
                    sexo: cliente.sexo,
                    estado: cliente.estado,
                    cidade: cliente.cidade,
                    endereco: cliente.endereco
                };
                const clienteForm = document.querySelector('#clienteForm');
                const clienteGrid = document.querySelector('#clienteGrid');
                
                clienteForm.classList.toggle('show');
                clienteGrid.classList.toggle('show');
            }
        }
    
    }
</script>