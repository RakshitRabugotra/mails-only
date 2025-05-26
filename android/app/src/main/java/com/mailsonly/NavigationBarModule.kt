package com.mailsonly

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NavigationBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "NavigationBar"

  @ReactMethod
  fun setColor(colorHex: String) {
    currentActivity?.let { activity ->
      activity.runOnUiThread {
        val window = activity.window
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
          window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
          window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)

          try {
            val color = Color.parseColor(colorHex)
            window.navigationBarColor = color

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
              val decorView = window.decorView
              var flags = decorView.systemUiVisibility

              // First clear the flag
              flags = flags and View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR.inv()

              // Decide based on luminance
              val useDarkIcons = isColorLight(color)

              // Set the appropriate flag
              if (useDarkIcons) {
                flags = flags or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
              }

              decorView.systemUiVisibility = flags
            }

          } catch (e: IllegalArgumentException) {
            window.navigationBarColor = Color.BLACK
          }
        }
      }
    }
  }

  private fun isColorLight(color: Int): Boolean {
    val r = Color.red(color)
    val g = Color.green(color)
    val b = Color.blue(color)
    // Standard luminance calculation
    val luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5
  }
}
