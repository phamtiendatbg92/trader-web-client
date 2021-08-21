export const state = () => ({
    tutorialList: "",
    currentTut : "",
})

export const getters = {
    tutorialList: state => {
        return state.tutorialList;
    },
    currentTut: state => {
        return state.currentTut;
    },
}

export const actions = {
    getListTutorial(context) {
        this.$axios.$get("get-list-tutorials").then(function (data) {
            context.commit('setListTutorial', data);
        });
    },
    getDetailedTut(context, tutorialUrl) {
        // get all tutorial
        this.$axios
            .$get("detail-tutorial", {
                params: {
                    tutorialUrl: tutorialUrl,
                },
            })
            .then(function (data) {
                context.commit('setCurrentTut', data);
            });
    },
    
}

export const mutations = {
    setListTutorial(state, payload) {
        state.tutorialList = payload
    },
    setCurrentTut(state, payload) {
        payload.content = payload.content.replace("SERVER_PUBLIC_KEY", "http://localhost:5000/images/");
        console.log(payload);
        state.currentTut = payload;
    },
}