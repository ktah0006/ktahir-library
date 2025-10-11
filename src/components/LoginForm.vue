<template>
  <div class="container mt-5">
    <div class="row">
      <div class="form">
        <h1 class="text-center">User Information Form / Credentials</h1>
        <!-- this way the submitForm functino is called when submit is pressed
         this prevents reload upon clicking submission -->
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- <div class="col-md-6"> -->
            <!-- Always take up only 6 columns even for the smallest breakpoint -->
            <div class="col-6">
              <label for="username" class="form-label">Username:</label>
              <!-- @blur is Vue.js event directive, It listens for the blur event, 
               which occurs when the user leaves (unfocuses) the input field 
               @input is Vue.js event directive, It listens for the input event, 
               which occurs whenever the value of the input field changes (e.g., when the user types) -->
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <!-- conditionally displays an error message. 
               The v-if directive checks if there is an error message stored in errors.username -->
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- <div class="col-md-6"> -->
            <!-- Always take up only 6 columns even for the smallest breakpoint -->
            <div class="col-6">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <!-- <div class="col-md-6"> -->
            <div class="col-6 d-flex align-items-center">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label ms-2" for="isAustralian">Australian Resident?</label>
              </div>
            </div>

            <!-- <div class="col-md-6"> -->
            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
              >
                <option value="" disabled>Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <div class="mb-3">
            <div class="col-12">
              <label for="reason" class="form-label">Reason For Joining:</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                @blur="() => validateReason(true)"
                @input="() => validateReason(false)"
                v-model="formData.reason"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-center">
            <DataTable
              :value="submittedCards"
              paginator
              :rows="5"
              tableStyle="min-width: 50rem"
              stripedRows
              responsiveLayout="scroll"
            >
              <Column field="username" header="Username" />
              <Column field="password" header="Password" />
              <Column header="Australian Resident">
                <template #body="slotProps">{{
                  slotProps.data.isAustralian ? 'Yes' : 'No'
                }}</template>
              </Column>
              <Column field="gender" header="Gender" />
              <Column field="reason" header="Reason" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateReason(true)
  validateGender(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.reason &&
    !errors.value.gender
  ) {
    // Each time you click the Submit button, one “snapshot” of the form gets pushed into this array
    submittedCards.value.push({
      // uses the spread operator (...) to make a copy of the current form data.
      // This way, even if you later change formData (e.g., typing again or clearing inputs), your submitted record doesn’t change — it’s safely stored.
      ...formData.value,
    })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    // blur parameter (boolean) indicates whether validation was triggered by the user leaving (blurring) the input field
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  // check using regular expressions
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must at least be ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase character'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase character'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character'
  } else {
    errors.value.password = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason
  if (reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must at least be 10 characters long'
  } else if (reason.length > 500) {
    if (blur) errors.value.reason = 'Reason must not exceed 500 characters'
  } else {
    errors.value.reason = null
  }
}

const validateGender = (blur) => {
  const gender = formData.value.gender
  if (!gender) {
    if (blur) errors.value.gender = 'Please select an option'
  } else {
    errors.value.gender = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
