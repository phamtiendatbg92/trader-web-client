export const state = () => ({
    newTutorial : {
        title: "",
        content: "",
        tags : [],
    },
    totalTags: [],
})

export const getters = {
    newTutorial: state => {
        return state.newTutorial;
    },
    totalTags : state =>{
        return state.totalTags;
    }
}

export const actions = {
    getHashTags(context){
        // get all tutorial
        this.$axios
            .$get("get-hashtag")
            .then(function (data) {
                context.commit('setCurrentHashTag', data);
            });
    },
    addNewTag(context, newTag){
        context.commit('addNewTag', newTag);
    },
    uploadNewTut(){
        this.$axios
        .$post("upload-new-post", this.state.newTutorial)
        .then(function () {
          console.log("SUCCESSS");
        })
        .catch(function () {
          console.log("ERROR");
        });
    }
}

export const mutations = {
    setCurrentHashTag(state, payload){
        state.totalTags = payload.tags;
    },
    addNewTag(state, payload){
        state.totalTags.push(payload);
    }
}