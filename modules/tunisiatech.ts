import { indexRange, Product, RoadMap, Template, Information } from "utils/helpers";

export class Tunisiatech extends RoadMap implements Template {

    getInformation(): Information {
        return {
            name: 'Tunisiatech' ,
            method: 'POST',
            query: { search: 's', page: 'n' },
            uri: `https://tunisiatech.tn/tunisie`,
            options: {
                gzip: true,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    "Content-Type": "application/json;charset=UTF-8"
                },
                resolveWithFullResponse: true
            },
            api: false
        }
    }

    getPages(): indexRange {
        return { start: 0, end: 5 }
    }

    getProducts(): Array<Product> {
        let products = []
        for (let element in this.$("div.ajax_block_product").children()) {
            products.push(this.getProduct(element))
        }
        return products
    }

    getProduct(element: any): Product {
        let name = this.$(element).find(".product-title > a").text();
        let pic = this.$(element).find("a.product-thumbnail  > img");
        let price = this.$(element).find(".price > span");

        return new Product(
            name,
            pic.attr("src"),
            pic.parent().attr("href"),
            price.text().replace(/(\r\n\s|\n|\r|\s)/gm, '').replace(',', '.'),
            price.parent().prev().prev().prev().text().replace(/(\r\n\s|\n|\r|\s)/gm, '').replace(',', '.'),
            "",
        )
    }

}