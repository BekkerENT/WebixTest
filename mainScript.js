let storageShop = [
    { id: 1, name: 'CPU', price: 2, quantity: 5 },
    { id: 2, name: 'GPU', price: 4, quantity: 3 },
    { id: 3, name: 'HDD', price: 12, quantity: 2 },
    { id: 4, name: 'SSD', price: 3, quantity: 2 },
    { id: 5, name: 'RAM', price: 1, quantity: 3 },
];
let storageShopBascket = [



];


webix.ready(function () {
    webix.ui({

        height: 500,
        container: "containerId",
        align: "center",
        type: 'head',

        rows:
            [

                {
                    template: "SShop of BЫdloCoders", width: 100, height: 50

                }, { template: "0", id:"pay", width: 100, height: 50 },

                {
                    cols:
                        [
                            { template: "WareHouse", width: 100 },
                            {
                                view: "datatable", width: 350,
                                id: "warehouse",
                                autoConfig: true,
                                //drag: "move",
                                //dragColumn: "true",

                                data: storageShop,
                                template: "#id# #name# |price #price#| |Amount #quantity#|",
                                on: {

                                    "onItemClick": MoveBuscket

                                }


                            },

                            { template: "Backet", width: 100 },

                            {
                                view: "datatable", width: 350,
                                id: "BacketID",
                                autoConfig: true,
                                template: "#id# #name# |price #price#| |Amount #quantity#|",
                                on: {

                                    "onItemClick": DeleteBus

                                }


                            },

                        ]
                },

            ]



    });
});
let amountBacket = 1;
let payCost=0;
function MoveBuscket(event) {//в функции используется контекст присвоим ему значение event

    let RowCopyTableLeft = $$('warehouse').getItem(event.row);//получили итем от правой таблицы
    let itemLeftTableCopy = webix.copy($$('warehouse').getItem(event.row));//делаем копию
    let itemSBacket = $$('BacketID').getItem(event.row);//получили доступ к ИТЕМ(это ключевой момент) ибо getSelectedId мы не получим


    if (itemLeftTableCopy.quantity == 0) {
       webix.message('empty on storage')
    }
    else if (itemSBacket) {//если строка есть, то редактируем ее данные
        RowCopyTableLeft.quantity--;
        itemSBacket.quantity++;//есть доступ к двум таблицам, инкреэтим их
        payCost+=RowCopyTableLeft.price;//припайка цены к переменной
        $$('pay').define("template",payCost);//замена значения атрибута темплейт 
        $$('pay').refresh();//обновление
        $$('warehouse').refresh();
        $$('BacketID').refresh();

    } else {//сработает если строки в таблице нет


        RowCopyTableLeft.quantity--;//если строки нет в корзине, то мы отнимаем одну единицу и добавляем строку, после переходим в часть с логикой если строка есть, то мы прибавляем по одному
        $$("BacketID").add(itemLeftTableCopy);//добавление
        itemLeftTableCopy.quantity = 1;//присваеваем значение добавленому значение ноль
        payCost+=RowCopyTableLeft.price;
        $$('pay').define("template",payCost);
        $$('warehouse').refresh();
        $$('pay').refresh();
        $$('BacketID').refresh();//своевременное обновление таблицы 
    }
}
function DeleteBus(event) {//функция удаления
    let rightRow = $$('BacketID').getItem(event.row);
    let leftRow = $$('warehouse').getItem(event.row);
    if (rightRow.quantity == 1) {
        //$$('BacketID').deleteRow(rightRow);
        leftRow.quantity + 1
        payCost-=rightRow.price;
        $$('pay').define("template",payCost);
        $$('pay').refresh();
        console.log(leftRow.quantity++)
        $$('BacketID').remove(event);
        $$('BacketID').refresh();
        $$('warehouse').refresh();
    }
    else {
        rightRow.quantity--;
        leftRow.quantity++;
        payCost-=rightRow.price;
        $$('pay').define("template",payCost);
        $$('pay').refresh();
        $$('warehouse').refresh();
        $$('BacketID').refresh();

    }

}


