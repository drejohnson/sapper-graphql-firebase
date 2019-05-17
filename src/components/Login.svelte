<script>
  import { signOut } from '../firebase/auth'
  import { authStore } from '../stores/auth'
  import Profile from './Profile.svelte'
  import SignInButton from './SignInButton.svelte'
</script>

<section>
  {#if $authStore.status === 'in'}
    <Profile {...$authStore.user} />
    <button on:click={signOut}>Logout</button>
  {:else}
    <SignInButton provider={'google'} />
    <SignInButton provider={'facebook'} />
  {/if}
</section>
