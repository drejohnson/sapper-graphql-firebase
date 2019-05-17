<script>
  import { signInWithFacebook, signInWithGoogle } from '../firebase/auth'

  export let provider
</script>

{#if provider === 'google'}
  <button on:click={signInWithGoogle} class="google">
    <span>Sign in with Google</span>
  </button>
{:else if provider === 'facebook'}
  <button on:click={signInWithFacebook} class="facebook">
    <span>Sign in with facebook</span>
  </button>
{:else}
  <div>No provider was provided as a prop</div>
{/if}
