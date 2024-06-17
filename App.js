import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View,
         Button, ScrollView } from 'react-native';
import {supabase} from './conexao'

export default function App() {
  const [tituloDigitado, setTituloDigitado] = useState("");
  const [autorDigitado, setAutorDigitado] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [dados, setDados] = useState([]);

  //Função para consultar os livros
  const consultarLivros = async () => {
    const { data, error } = await supabase.from("tb_livros").select("*");
    if (error) {
      alert("Falha ao consultar! " + error.message);
    } else {
      setDados(data);
    }
  };

  useEffect(() => {
    consultarLivros();
  }, []);

  //Função para cadastrar os livros
  const cadastrarLivro = async () => {
    const { error } = await supabase.from("tb_livros").insert({
      titulo: tituloDigitado,
      autor: autorDigitado,
      ano_publicacao: anoPublicacao,
    });
    if (error) {
      alert("Falha ao cadastrar! " + error.message);
    } else {
      alert("Livro cadastrado com sucesso!");
      consultarLivros();
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={{ fontSize: 20 }}>Cadastro de Livros</Text>
      <TextInput
        onChangeText={(texto) => setTituloDigitado(texto)}
        placeholder="Digite o título"
        style={estilos.caixaTexto}
      />
      <TextInput
        onChangeText={(texto) => setAutorDigitado(texto)}
        placeholder="Digite o autor"
        style={estilos.caixaTexto}
      />
      <TextInput
        onChangeText={(texto) => setAnoPublicacao(texto)}
        placeholder="Digite o ano de publicação"
        style={estilos.caixaTexto}
        keyboardType="numeric"
      />
      <Button title="Cadastrar" onPress={() => cadastrarLivro()} />

      <ScrollView>
        {dados.map((livro, index) => (
          <View style={estilos.cxLivros} key={index}>
            <Text> TÍTULO: {livro.titulo} </Text>
            <Text> AUTOR: {livro.autor} </Text>
            <Text> ANO DE PUBLICAÇÃO: {livro.ano_publicacao} </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  cxLivros: {
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10,
    marginBottom: 10,
  },
  caixaTexto: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
});