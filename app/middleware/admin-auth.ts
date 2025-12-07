/**
 * Middleware to protect admin routes
 * Redirects to login if user is not authenticated or not an admin
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Wait for user to be loaded
  if (user.value === undefined) {
    // User state is still loading, wait a bit
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // If no user, redirect to login
  if (!user.value) {
    return navigateTo('/admin/login')
  }

  // Check if user is an active admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, active')
    .eq('auth_user_id', user.value.id)
    .single()

  if (!adminUser || !adminUser.active) {
    // Sign them out and redirect to login
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})
