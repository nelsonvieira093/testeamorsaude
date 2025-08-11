<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lista de Clínicas - AmorSaúde</title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    
    <!-- Outros estilos customizados podem ser adicionados aqui -->
</head>
<body>

    <!-- Navbar básica -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
            <a class="navbar-brand" href="{{ url('/') }}">AmorSaúde</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                aria-label="Alternar navegação">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="{{ route('clinics.index') }}">Clínicas</a>
                    </li>
                    <!-- Outros links se houver -->
                </ul>
            </div>
        </div>
    </nav>

    <!-- Conteúdo principal -->
    <div class="container">
        <h1 class="mb-4">Clínicas</h1>

        <!-- Mensagem de sucesso -->
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
            </div>
        @endif

        @if($clinics->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nome Fantasia</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($clinics as $clinic)
                        <tr>
                            <td>{{ $clinic['fantasyName'] ?? $clinic->fantasyName ?? $clinic->name ?? 'N/A' }}</td>
                            <td>{{ $clinic['address'] ?? $clinic->address ?? 'N/A' }}</td>
                            <td>{{ $clinic['city'] ?? $clinic->city ?? 'N/A' }}</td>
                            <td>{{ $clinic['state'] ?? $clinic->state ?? 'N/A' }}</td>
                            <td>
                                @php
                                    $active = $clinic['active'] ?? $clinic->active ?? false;
                                @endphp

                                @if($active)
                                    <span class="badge bg-success">Ativa</span>
                                @else
                                    <span class="badge bg-secondary">Inativa</span>
                                @endif
                            </td>
                            <td>
                                <!-- Links desabilitados porque dados mock, você pode ajustar para rotas reais caso tenha -->
                                <a href="#" class="btn btn-info btn-sm disabled" tabindex="-1" aria-disabled="true">Ver</a>
                                <a href="#" class="btn btn-warning btn-sm disabled" tabindex="-1" aria-disabled="true">Editar</a>
                                <button class="btn btn-danger btn-sm" disabled>Excluir</button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Caso use paginação, remova o disabled e configure corretamente -->
            <div class="d-flex justify-content-center">
                {{ $clinics instanceof \Illuminate\Pagination\LengthAwarePaginator ? $clinics->links() : '' }}
            </div>
        @else
            <p class="alert alert-info">Nenhuma clínica encontrada.</p>
        @endif

        <a href="{{ route('clinics.create') }}" class="btn btn-primary mt-4">Adicionar Nova Clínica</a>
    </div>

    <!-- Bootstrap JS + Popper CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>

</body>
</html>
