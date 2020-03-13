var intro = new Vue({
  el: "#title",
  data: {
    title: "Introduction",
    content:
      "<strong>Esperanto</strong> is the most widely spoken constructed international auxiliary language created by <em>L. L. Zamenhof</em>."
  }
});
var words = new Vue({
  el: "#words",
  data: {
    title: "Dictionary",
    items: [
      { text_eo: "granda", text_en: "big" },
      { text_eo: "malgranda", text_en: "small" },      
      { text_eo: "Kato", text_en: "Cat" },
      { text_eo: "Hundo", text_en: "Dog"},
      { text_eo: "Veturi", text_en: "Travel"},
      { text_eo: "Birdo", text_en: "Bird"}
    ],
    nounCount: 0,
    verbCount: 0, 
    adjectiveCount: 0,
    parts: [ "nouns", "verbs", "adjectives"],

    input_eo: "",
    input_en: ""
  },
  methods: {
      addItem: function(e) {
        e.preventDefault();
        if (!this.input_eo|!this.input_en) return;
  
        this.items.push({ text_eo: this.input_eo, text_en: this.input_en });
        this.input_eo = "";
        this.input_en = "";
      },
      deleteItem: function(index) {
        this.items.splice(index, 1);
      },
      countParts: function(){
        var letter = "";
        this.nounCount= 0;
        this.verbCount = 0; 
        this.adjectiveCount = 0;
        var items = this.items;
        for (var i in items) {
          letter = items[i].text_eo.slice(-1);
          switch(letter) {
            case 'o':
              this.nounCount++;
              break;
            case 'i':
              this.verbCount++;
              break;
            case 'a':
              this.adjectiveCount++;
              break;
           }
        }
      },
      returnCount: function(part){
        if (part == 'nouns') {return this.nounCount}
        if (part == 'verbs') {return this.verbCount}
        if (part == 'adjectives') {return this.adjectiveCount}
        if (part == 'words') {return this.items.length}
      },
  },
  filters: {
      capitalize: function(value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      undercase: function(value) {
        if (!value) return "";
        value = value.toString();
        return value.toLowerCase();
      },
      uppercase: function(value) {
          if (!value) return "";
          value = value.toString();
          return value.toUpperCase();
      }
  },
  computed: {
    totalWords: function() {
      this.countParts();
      return this.items.length;
    },
    totalNouns: function(){
      return this.nounCount;
    },
    totalVerbs: function(){
      return this.verbCount;
    },
    totalAdjectives: function(){
      return this.adjectiveCount;
    }
  },

  components:{
    'words-counter':{
      props: ["name"],
      data: function () {
        return {
          subject: this.name
        }
      },
      template: '<span>Number of {{ subject }} in the dictionary: </span>'
    }
  },
  //beforeMounted(){
  //  this.countParts()
  //},
});

