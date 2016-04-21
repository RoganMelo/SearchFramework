var Painel = function (elem) {
    //vars
    this.elem = elem;
    this.itens = [];

    //methods
    this.setItens = function () {
        this.itens = this.elem.children("[data-item]");
    };

    this.getItens = function () {
        return this.itens;
    };

    this.SelectedItens = function (itens) {
        this.itens.attr("hidden", "hidden");
        var control = true;

        for (var i = 0; i < itens.length; i++) {
            $(itens[i]).removeAttr("hidden");
        }
    };

    //constructors
    this.setItens();
};
