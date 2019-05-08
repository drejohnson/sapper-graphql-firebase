<script>
  import { authState, signInWithGoogle, signOut } from '../stores/auth';
  import Profile from './Profile.svelte';
</script>

<section>
  {#if $authState.status === 'logged-in'}
    <Profile {...$authState.user} />
    <button on:click={signOut}>Logout</button>
  {:else}
  <button on:click={signInWithGoogle}>
    Sign in with Google
  </button>
  {/if}
</section>