export const state = () => ({
    tutorialList: {},
    currentTut: {},
    commentList: []
})

export const getters = {
    tutorialList: state => {
        return state.tutorialList;
    },
    currentTut: state => {
        return state.currentTut;
    },
    commentList: state => {
        return state.commentList;
    }
}

export const actions = {
    deleteComment(context, commentObj) {
        this.$axios.$delete("tutorial/comment", {
            data: {
                id: commentObj.id,
                level: commentObj.level,
            }
        }).then(function () {
            context.commit('deleteComment', commentObj);
        });
    },
    pushComment(context, commentObj) {
        this.$axios.$post("tutorial/comment", commentObj).then(function (data) {
            commentObj.id = data;
            context.commit('pushComment', commentObj);
        });
    },
    pushReply(context, replyObj) {
        this.$axios.$post("tutorial/reply-comment", replyObj).then(function (data) {
            replyObj.id = data;
            context.commit('pushReply', replyObj);
        });
    },
    getListTutorial(context) {
        this.$axios.$get("tutorial/get-list-tutorials").then(function (data) {
            context.commit('setListTutorial', data);
        });
    },
    getComment(context, id) {
        this.$axios
            .$get("tutorial/comment", {
                params: {
                    id: id
                }
            })
            .then(function (data) {
                context.commit('setComment', data);
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status == 404) {
                        self.$router.push('/error');
                    }
                }
            });
    },
    getDetailedTut(context, tutorialUrl) {
        // get all tutorial
        const requestUrl = "tutorial/detail-tutorial/" + tutorialUrl;
        var self = this;
        this.$axios
            .$get(requestUrl)
            .then(function (data) {
                context.commit('setCurrentTut', data);
                context.dispatch("getComment", data.id);
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status == 404) {
                        self.$router.push('/error');
                    }
                }
            });
    },
    uploadNewTutorial(context) {
        // await this.sleep(5000);
        context.state.currentTut.authorId = context.rootState.auth.user.user_id;
        this.$axios
            .$post("tutorial/upload-new-post", context.state.currentTut)
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
            .$put("tutorial/update-post", context.state.currentTut)
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
        context.commit("clearCurrentTut");
    },
    deleteTutorial(context, id) {
        context.dispatch('showWaitingDialog', true, { root: true });
        this.$axios.$delete("tutorial/delete-post/" + id).then(function () {
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
    deleteComment(state, commentObj) {
        if (commentObj.level == 1) {
            state.commentList = state.commentList.filter(element => {
                return element.id != commentObj.id
            })
        } else {
            for (let i = 0; i < state.commentList.length; i++) {
                if (state.commentList[i].id == commentObj.parentId) {
                    state.commentList[i].replies = state.commentList[i].replies.filter(element => {
                        return element.id != commentObj.id
                    })
                    return;
                }
            }
        }
    },
    setComment(state, comment) {
        if(comment == null){
            state.commentList = [];
        }else{
            state.commentList = comment;
        }
    },
    pushComment(state, commentObj) {
        var temp = {
            id: commentObj.id,
            comment: {
                userId: this.$auth.user.user_id,
                comment: commentObj.comment,
            },
            replies: []
        };
        state.commentList.push(temp);
    },
    pushReply(state, replyObj) {
        replyObj.userId = this.$auth.user.user_id;
        for (var i = 0; i < state.commentList.length; i++) {
            if (state.commentList[i].id == replyObj.parentId) {
                if (state.commentList[i].replies) {
                    state.commentList[i].replies.push(replyObj);
                } else {
                    state.commentList[i].replies = [];
                    state.commentList[i].replies.push(replyObj);
                }

            }
        }
    },
    clearCurrentTut(state) {
        // Clear data
        state.currentTut.title = "";
        state.currentTut.content = "";
        state.currentTut.tags = [];
        state.currentTut = { ...state.currentTut };
    },
    setListTutorial(state, payload) {
        state.tutorialList = payload
    },
    setCurrentTut(state, payload) {
        state.currentTut = payload;
    },
    updateMeta(state, payload) {
        state.currentTut.description = payload;
    },
    updateTitle(state, payload) {
        state.currentTut.title = payload;
    },
    updateContent(state, payload) {
        state.currentTut.content = payload;
    },
    updateTag(state, payload) {
        state.currentTut.tags = payload;
    },
    removeTut(state, id) {
        state.tutorialList = state.tutorialList.filter(tut => tut.id != id);
    }
}