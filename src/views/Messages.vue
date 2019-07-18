<template>
  <div class="messages">
    
    <h1>New Message</h1>
    <div>
      <textarea v-model="newMessageBody"></textarea><br>
      <button class="btn btn-primary" v-on:click="createMessage()">Create Message</button>
    </div>
    <h1>All Messages</h1>
    <div v-for="message in messages">
      <p><strong>{{ message.name }}</strong> : {{ relativeDate(message.created_at) }}</p>
      <p>{{ message.body }}</p>
    </div>
    
    
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";
import moment from 'moment';

export default {
  data: function() {
    return {
      messages: [],
      newMessageBody: ""
    };
  },
  created: function() {
    axios.get("/api/messages").then(response => {
      this.messages = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: data => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.messages.unshift(data); // update the messages in real time
      }
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        body: this.newMessageBody
      };
      axios.post("/api/messages", params).then(response => {
        this.newMessageBody = "";
      });
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>