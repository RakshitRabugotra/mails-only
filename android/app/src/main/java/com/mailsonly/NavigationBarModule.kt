package com.mailsonly  // Replace with your app's package name

import android.view.View
import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NavigationBarModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val activity: Activity?
        get() = currentActivity

    override fun getName(): String = "NavigationBar"

    @ReactMethod
    fun setColor(colorHex: String, darkIcons: Boolean) {
        currentActivity?.let { activity ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                activity.runOnUiThread {
                    try {
                        val window = activity.window
                        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
                        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
                        window.navigationBarColor = Color.parseColor(colorHex)

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            val decorView = window.decorView
                            var flags = decorView.systemUiVisibility

                            flags = if (darkIcons) {
                                flags or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                            } else {
                                flags and View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR.inv()
                            }

                            decorView.systemUiVisibility = flags
                        }
                    } catch (e: IllegalArgumentException) {
                        activity.window.navigationBarColor = Color.BLACK
                    }
                }
            }
        }
    }
}
