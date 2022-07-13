import { fireEvent, render, screen } from "@testing-library/react";
import { SearchUserAutocomplete } from "../shared/components/SearchUserAutocomplete";
import * as redux from "react-redux";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../model/usuario.model";
import { AxiosResponse } from "axios";

describe("SearchUserAutocomplete Test", () => {
  it("When search for a user to add should return a user list", () => {
    const usuarios = {
      data: [
        new Usuario({
          id: 1,
          dadosPessoais: { nome: "Teste", username: "teste02" },
        }),
      ],
    } as AxiosResponse<Usuario[]>;

    const userSpy = jest.spyOn(new UsuarioService(), "search").mockResolvedValueOnce(usuarios);
    const spy = jest.spyOn(redux, "useSelector");

    spy.mockReturnValue({ usuario: { id: 1 }, error: false, loading: false });

    render(<SearchUserAutocomplete onAddContato={() => {}} />, {});

    const autoComplete = screen.getByTestId("fetchUserList");

    expect(screen.findByTestId("contato-on-search")).toBeInTheDocument;

  });
});

export {};
