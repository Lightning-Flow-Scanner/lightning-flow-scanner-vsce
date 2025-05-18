<script setup lang="ts">
import { ref } from 'vue';

const name = ref<string>('')
const email = ref('')
const message = ref('');
const fruit = ref('Banana');
const color = ref('red');
const topics = ref(['IT']);
const terms = ref(true);
const newsletter = ref(false);
</script>

<template>
  <h1>Controlled components</h1>
  <div class="forms">
    <div class="vscode-form">
      <h2>A form created using VSCode Elements</h2>
      <form action="./">
        <vscode-form-group variant="vertical">
          <vscode-label for="name">Name</vscode-label>
          <vscode-textfield id="name" v-model="name" name="name"></vscode-textfield>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-label for="email">E-mail</vscode-label>
          <vscode-textfield type="email" id="email" v-model="email" name="email"></vscode-textfield>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-label for="fruit">Favorite fruit</vscode-label>
          <vscode-single-select v-model="fruit" id="fruit" name="fruit">
            <vscode-option>Apple</vscode-option>
            <vscode-option>Banana</vscode-option>
            <vscode-option>Cherry</vscode-option>
          </vscode-single-select>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-label for="radio-1">Favorite color</vscode-label>
          <vscode-radio-group>
            <vscode-radio type="radio" name="color" v-model="color" value="red" id="radio-1">Red</vscode-radio>
            <vscode-radio type="radio" name="color" v-model="color" value="green">Green</vscode-radio>
            <vscode-radio type="radio" name="color" v-model="color" value="blue">Blue</vscode-radio>
          </vscode-radio-group>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-label for="topics">Favorite topics</vscode-label>
          <vscode-multi-select v-model="topics" name="topics" id="topics">
            <vscode-option>IT</vscode-option>
            <vscode-option>Art</vscode-option>
            <vscode-option>Sport</vscode-option>
            <vscode-option>History</vscode-option>
            <vscode-option>Business</vscode-option>
            <vscode-option>Science</vscode-option>
          </vscode-multi-select>
        </vscode-form-group>
        <vscode-form-group>
          <vscode-checkbox type="checkbox" v-model="terms">Accept terms & conditions</vscode-checkbox>
        </vscode-form-group>
        <vscode-form-group>
          <vscode-checkbox type="checkbox" v-model="newsletter">Subscribe to newsletter</vscode-checkbox>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-label for="textarea">Message</vscode-label>
          <vscode-textarea id="textarea" v-model="message"></vscode-textarea>
        </vscode-form-group>
        <vscode-form-group variant="vertical">
          <vscode-button type="submit">Submit</vscode-button>
          <vscode-button type="reset" secondary>Reset</vscode-button>
        </vscode-form-group>
      </form>
    </div>
    <div class="native-form">
      <h2>A native form</h2>
      <form action="./">
        <div>
          <label for="n-name">Name</label>
          <input type="text" id="n-name" v-model="name" name="name">
        </div>
        <div>
          <label for="n-email">E-mail</label>
          <input type="text" id="n-email" v-model="email" name="email">
        </div>
        <div>
          <label for="n-fruit">Favorite fruit</label>
          <select name="fruit" id="n-fruit" v-model="fruit">
            <option>Apple</option>
            <option>Banana</option>
            <option>Cherry</option>
          </select>
        </div>
        <div>
          <label>Favorite color</label>
          <div class="radio-group">
            <div>
              <input type="radio" name="color" v-model="color" value="red" id="n-radio-1">
              <label for="n-radio-1">Red</label>
            </div>
            <div>
              <input type="radio" name="color" v-model="color" value="green" id="n-radio-2">
              <label for="n-radio-2">Green</label>
            </div>
            <div>
              <input type="radio" name="color" v-model="color" value="blue" id="n-radio-3">
              <label for="n-radio-3">Blue</label>
            </div>
          </div>
        </div>
        <div>
          <label for="n-topics">Favorite topics</label>
          <select name="topics" id="n-topics" v-model="topics" multiple>
            <option>IT</option>
            <option>Art</option>
            <option>Sport</option>
            <option>History</option>
            <option>Business</option>
            <option>Science</option>
          </select>
        </div>
        <div>
          <input type="checkbox" v-model="terms" name="terms" id="n-terms">
          <label for="n-terms">Accept terms & conditions</label>
        </div>
        <div>
          <input type="checkbox" v-model="newsletter" name="newsletter" id="n-newsletter">
          <label for="n-newsletter">Subscribe to newsletter</label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
  <div>
    <p>Name: {{ name }}</p>
    <p>E-mail: {{ email }}</p>
    <p>Favorite fruit: {{ fruit }}</p>
    <p>Favorite color: {{ color }}</p>
    <p>Message: {{ message }}</p>
    <p>Favorite topics:</p>
    <ul>
      <li v-for="f in topics" :key="f">
        {{ f }}
      </li>
    </ul>
    <p>Terms & conditions: {{ terms }}</p>
    <p>Newsletter: {{ newsletter }}</p>
  </div>
</template>

<style>
h1 {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}

.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 800px;
}

form {
  border: 1px solid var(--vscode-widget-border);
  border-radius: 5px;
  padding: 20px;
  width: 320px;
}

.native-form label {
  display: block;
  font-weight: 600;
  padding: 5px 0;
}

.native-form input[type="radio"] + label,
.native-form input[type="checkbox"] + label {
  display: inline-block;
  font-weight: normal;
}
</style>