import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { incluirProduto, atualizarProduto } from '../../redux/produtoReducer';

export default function FormCadProduto(props) {
    //recuperar as categorias
    //os atributos deste objeto devem estar associados aos inputs do formulários
    const produtoVazio = {
        codigo: '0',
        descricao: '',
        precoCusto: '',
        precoVenda: '',
        dataValidade: '',
        qtdEstoque: '',
        categoria: {
            codigo:0,
            descricao:''
        }
    }
    const estadoInicialProduto = props.produtoParaEdicao;
    const [produto, setProduto] = useState(estadoInicialProduto);
    const [formValidado, setFormValidado] = useState(false);
    

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        console.log(componente.value)
        setProduto({ ...produto, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            //todos os campos preenchidos
            //mandar os dados para o backend
            if (!props.modoEdicao) {
                //substituído pelo padrão redux
                //props.setListaProdutos([...props.listaProdutos,produto]);
               
            }
            else {
                //alterar os dados do produto (filtra e adiciona)

                //substituído pelo padrão redux
                //props.setListaProdutos([...props.listaProdutos.filter((itemProduto)=>itemProduto.cpf !== produto.cpf),produto]);
               
                props.setModoEdicao(false);
                props.setProdutoParaEdicao(produtoVazio);
            }
            setProduto(produtoVazio); // ou sair da tela de formulário 
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Codigo:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    value={produto.codigo}
                                    onChange={manipularMudancas}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Descrição:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição do produto"
                                    id="descricao"
                                    name="descricao"
                                    value={produto.descricao}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Form.Group>
                            <FloatingLabel
                                label="Preço de Custo:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="0.00"
                                    id="precoCusto"
                                    name="precoCusto"
                                    onChange={manipularMudancas}
                                    value={produto.precoCusto}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o preço de custo do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <FloatingLabel
                                label="Preço de Venda:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="0.00"
                                    id="precoVenda"
                                    name="precoVenda"
                                    onChange={manipularMudancas}
                                    value={produto.precoVenda}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o preço de venda do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Data de Validade:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="date"
                                    placeholder=""
                                    id="dataValidade"
                                    name="dataValidade"
                                    onChange={manipularMudancas}
                                    value={produto.bairro}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a data de validade do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <FloatingLabel
                                label="Quantidade em estoque:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    onChange={manipularMudancas}
                                    value={produto.qtdEstoque}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a quantidade em estoque do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <FloatingLabel controlId="floatingSelect" label="Categoria:">
                            <Form.Select
                                aria-label="Categoria dos produtos"
                                id='categoria'
                                name='categoria'
                                onChange={manipularMudancas}
                                value={produto.categoria.codigo}
                                requerid>
                                <option value="SP" selected>São Paulo</option>

                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false)
                        }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}