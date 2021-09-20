export const state = () => ({
    tutorialList: {},
    currentTut: {},
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
        const requestUrl = "detail-tutorial/" + tutorialUrl;
        var self = this;
        this.$axios
            .$get(requestUrl)
            .then(function (data) {
                context.commit('setCurrentTut', data);
            }).catch(function (error) {
                if (error.response) {
                    if(error.response.status == 404)
                    {
                        self.$router.push('/error');
                    }
                }
            });
    },
    uploadNewTutorial(context) {
        // await this.sleep(5000);
        this.$axios
            .$post("upload-new-post", context.state.currentTut)
            .then(function () {
                context.dispatch('showDialog', {
                    title: "Upload successfully",
                    content: "Upload successfully !!!",
                }, { root: true });

                context.commit("clearCurrentTut");
                // close waiting dialog
                context.dispatch('showWaitingDialog', false, { root: true });
            })
            .catch(function (error) {
                context.dispatch('showDialog', {
                    title: "Somethings wrong !!!",
                    content: "Somethings wrong !!!" + error,
                }, { root: true });
                // close waiting dialog
                context.dispatch('showWaitingDialog', false, { root: true });
            });
    },
    updateTutorial(context) {
        // await this.sleep(5000);
        this.$axios
            .$put("update-post", context.state.currentTut)
            .then(function () {
                context.dispatch('showDialog', {
                    title: "Update successfully",
                    content: "Update successfully !!!",
                }, { root: true });

                // close waiting dialog
                context.dispatch('showWaitingDialog', false, { root: true });
            })
            .catch(function (error) {
                context.dispatch('showDialog', {
                    title: "Somethings wrong !!!",
                    content: "Somethings wrong !!!" + error,
                }, { root: true });
                // close waiting dialog
                context.dispatch('showWaitingDialog', false, { root: true });
            });
    },
    clearCurrentTut(context) {
        console.log("Clear action");
        context.commit("clearCurrentTut");
    },
    deleteTutorial(context, id) {
        context.dispatch('showWaitingDialog', true, { root: true });
        this.$axios.$delete("delete-post/" + id).then(function () {
            context.dispatch('showDialog', {
                title: "Delete successfully",
                content: "Delete successfully !!!",
            }, { root: true });
            context.commit("removeTut", id)
            // close waiting dialog
            context.dispatch('showWaitingDialog', false, { root: true });
        }).catch(function (error) {
            context.dispatch('showDialog', {
                title: "Somethings wrong !!!",
                content: "Somethings wrong !!!" + error,
            }, { root: false });
            // close waiting dialog
            context.dispatch('showWaitingDialog', false, { root: true });
        });
    }
}

export const mutations = {
    clearCurrentTut(state) {
        // Clear data
        state.currentTut.Title = "";
        state.currentTut.Content = "";
        state.currentTut.Tag = [];
        state.currentTut = { ...state.currentTut };
    },
    setListTutorial(state, payload) {
        state.tutorialList = payload
    },
    setCurrentTut(state, payload) {
        state.currentTut = payload;
    },
    updateTitle(state, payload) {
        state.currentTut.Title = payload;
    },
    updateContent(state, payload) {
        state.currentTut.Content = payload;
    },
    updateTag(state, payload) {
        state.currentTut.Tag = payload;
    },
    removeTut(state, id) {
        state.tutorialList = state.tutorialList.filter(tut => tut.Id != id);
    }
}