import { render, screen } from "@testing-library/react";
import { Usuario } from "../model/usuario.model";
import AddContatoButton from "../shared/components/AddContatoButton";

describe("AddContatoButton Test", () => {
  it("should render the component on screen", () => {
    render(
      <AddContatoButton
        option={new Usuario({})}
        handleAddContato={(usuario: Usuario) => {}}
      />
    );


    expect(screen.getByTestId("svg-icon-circle")).toBeInTheDocument;
  });
});

export {};
