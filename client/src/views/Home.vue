<template lang="pug">
    .background
        .wrapper
            .categories-wrapper
                .categories
                    .category(v-for="(item, index) in categories" 
                    @mouseover="hideSvgIndex = index" 
                    @mouseleave="hideSvgIndex = ''"
                    @click="currentCategory = index + 1")
                        span {{ item.name }}
                        //svg(:class="{hidden: hideSvgIndex === index}")
                        svg
                            line(x1="10px" y1="0px" x2="20px" y2="10px" stroke="#dddddd" stroke-width="2px")
                            line(x1="10px" y1="20px" x2="20px" y2="10px" stroke="#dddddd" stroke-width="2px")
            .goods
                .product(v-for="item in goods")
                    .img-wrapper
                        img(:src="'data:image/jpeg;base64,'+item.img")
                    .name-wrapper
                        p {{ item.name }}
                    .price-wrapper
                        p {{ item.price }} <i class="fas fa-ruble-sign"></i>
                    button.button-buy Купить
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      categories: [],
      hideSvgIndex: "",
      goods: [],
      currentCategory: 1,
      imageBytes: ""
    };
  },
  methods: {
    al: function() {
      console.log(this.imageBytes);
    },
    loadGoods: async function() {
      const fs = require("browserify-fs");
      if (!this.categories[this.currentCategory - 1].loaded)
        await axios
          .get("http://localhost:3000/goods", {
            params: {
              category: this.currentCategory
            }
          })
          .then(response => {
            if (response.data.result) {
              this.categories[this.currentCategory - 1].goods =
                response.data.rows;
              this.categories[this.currentCategory - 1].loaded = true;
            }
          });

      this.goods = this.categories[this.currentCategory - 1].goods;
    }
  },
  mounted: async function() {
    await axios.get("http://localhost:3000/categories").then(response => {
      response.data.rows.forEach(item => {
        this.categories.push({
          name: item,
          loaded: false,
          goods: []
        });
      });
    });
    this.loadGoods();
  },
  watch: {
    currentCategory: function() {
      this.loadGoods();
    }
  }
};
</script>

<style lang="scss" scoped>
$light-grey: #f6f6f6;
$dark-grey: #dddddd;

.background {
  background-color: $light-grey;
}

.wrapper {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding: 10px 0;
}

.categories {
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: 1px solid $dark-grey;
  border-bottom: 1px solid $dark-grey;
  border-left: 2px solid crimson;
  border-radius: 3px;
}

.category {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: 1px solid $dark-grey;
  border-right: 1px solid $dark-grey;
  &:hover {
    color: crimson;
    //border-right: none;
  }
  &:nth-last-child(1) {
    border-bottom: none;
  }
  svg {
    width: 25px;
  }
}

.goods {
  margin-left: 20px;
  width: 830px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.product {
  display: flex;
  height: 400px;
  flex-direction: column;
  align-items: center;
  border: 1px solid $dark-grey;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  .img-wrapper {
    height: 50%;
    img {
      height: 100%;
    }
  }
  .name-wrapper {
    height: 20%;
  }
  .price-wrapper {
    margin-top: 20px;
    width: 100%;
    font-size: 28px;
  }
  .button-buy {
    margin-top: 20px;
  }
}

.hidden {
  display: none;
}
</style>
